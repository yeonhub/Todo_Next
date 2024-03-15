import { title } from "@/components/primitives";
import TodosTable from "@/components/todosTable"

async function fetchTodosApiCall() {
	console.log("fetchTodosApiCall called");
	const response = await fetch(`${process.env.BASE_URL}/api/todos/`, {cache : 'no-store'})

	return response.json();
}

export default async function TodosPage() {

	const response = await fetchTodosApiCall();

	return (
		<div className="flex flex-col space-y-8">
			<h1 className={title()}>Todos</h1>
			<TodosTable todos={response.data ?? []}></TodosTable>
			{/* <TodosTable todos={[]}></TodosTable> */}
		</div>
	);
}