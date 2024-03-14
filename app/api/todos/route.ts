import { NextRequest, NextResponse } from "next/server";
import dummyTodos from '@/data/dummy.json'

// get all todo
export async function GET(request : NextRequest) {

    const response = {
        msg : 'todos get 전체',
        data : dummyTodos
    }

    return NextResponse.json (response, {status : 201})
}

// post todo
export async function POST(request : NextRequest) {
   
    const data = await request.json()

    const newTodo = {
        id : "10",
        title : data.title,
        isDone : false
    }

    const response = {
        msg : 'todos post 성공',
        data : newTodo
    }
   
    return Response.json(response, {status : 201})
}