import { NextRequest, NextResponse } from "next/server";
import { fetchTodos, addTodo } from '@/data/firestore'

// todo 모두 가져오기
export async function GET(request : NextRequest) {

    const fetchedTodos = await fetchTodos()

    const response = {
        msg : 'todos get 전체',
        data : fetchedTodos
    }

    return NextResponse.json (response, {status : 200})
}

// todo 추가
export async function POST(request : NextRequest) {

    const {title} = await request.json();
    if(title === null){
        const errMsg = {
            msg : "title 없음"
        }
        return NextResponse.json (errMsg, {status : 422})
    }

    const addedTodo = await addTodo({title})

    const response = {
        msg : 'todos post 성공',
        data : addedTodo
    }
   
    return Response.json(response, {status : 200})
}