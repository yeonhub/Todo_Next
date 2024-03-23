import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, Timestamp, getDoc, updateDoc, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.envAPP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// todo 모두 가져오기
export async function fetchTodos() {
    const todosRef = collection(db, "todos")
    const descQuery = query(todosRef, orderBy("createdAt","desc"));
    const querySnapshot = await getDocs(descQuery);

    if (!querySnapshot) {
        return [];
    }
    const fetchTodos = [];

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            isDone: doc.data()["isDone"],
            createdAt: doc.data()["createdAt"].toDate()
        }
        fetchTodos.push(aTodo)
    });
    return fetchTodos;
}


// todo 추가
export async function addTodo({ title }) {
    const newTodoRef = doc(collection(db, "todos"));

    const createdAtTimestamp = Timestamp.fromDate(new Date());
    const createAtToDate = createdAtTimestamp.toDate();

    const newTodoData = {
        id: newTodoRef.id,
        title: title,
        isDone: false,
        createdAt: createAtToDate
    }

    await setDoc(newTodoRef, newTodoData);

    return newTodoData
}

// todo 단일 가져오기
export async function fetchATodo(id) {

    if (id === null) {
        return null;
    }

    const todoDocRef = doc(db, "todos", id);
    const todoDocSnap = await getDoc(todoDocRef);

    if (todoDocSnap.exists()) {
        console.log("Document data:", todoDocSnap.data());

        const fetchedTodo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            isDone: todoDocSnap.data()["isDone"],
            createdAt: todoDocSnap.data()["createdAt"].toDate()
        }

        return fetchedTodo;

    } else {
        console.log("No such document!");
        return null;
    }
}

// todo 단일 삭제
export async function deleteAtodo(id) {

    const fetchedTodo = await fetchATodo(id);
    if (fetchedTodo === null) {
        return null;
    }

    await deleteDoc(doc(db, "todos", id));

    return fetchedTodo;
}

// todo 단일 수정
export async function editAtodo(id, { title, isDone }) {

    const fetchedTodo = await fetchATodo(id);

    if (fetchedTodo === null) {
        return null;
    }

    const todoRef = doc(db, "todos", id);

    await updateDoc(todoRef, {
        title: title,
        isDone: isDone
    });

    return {
        id: id,
        title: title,
        isDone: isDone,
        createdAt: fetchedTodo.createdAt
    };
}

module.exports = { fetchTodos, addTodo, fetchATodo, deleteAtodo, editAtodo }