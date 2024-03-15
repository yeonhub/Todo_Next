import { NextRequest, NextResponse } from "next/server";
import { fetchATodo,deleteAtodo,editAtodo } from '@/data/firestore'

// todo 단일 가져오기
export async function GET(request : NextRequest, { params }: { params: { slug: string } }) {
   
    const fetchedTodo = await fetchATodo(params.slug)

    if(fetchedTodo===null){
        return new Response(null,{status : 204})
    }

    const response = {
        msg : 'todos 단일 가져오기',
        data :fetchedTodo
    }

    return NextResponse.json (response, {status : 200})
}

// todo 단일 삭제
export async function DELETE(request : NextRequest, { params }: { params: { slug: string } }) {
   
    const deletedTodo = await deleteAtodo(params.slug)

    if(deletedTodo===null){
        return new Response(null,{status : 204})
    }

    const response = {
        msg : 'todos delete 성공',
        data : deletedTodo
    }

    return NextResponse.json (response, {status : 200})
}

// todo 단일 수정
export async function POST(request : NextRequest, { params }: { params: { slug: string } }) {
   
    const {title, isDone} = await request.json()

    const editedTodo = await editAtodo(params.slug, {title, isDone})

    if(editedTodo===null){
        return new Response(null,{status : 204})
    }

    const response = {
        msg : 'todos 수정 성공',
        data : editedTodo
    }

    return NextResponse.json (response, {status : 200})
}