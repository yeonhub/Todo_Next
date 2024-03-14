import { NextRequest, NextResponse } from "next/server";

// get todo
export async function GET(request : NextRequest, { params }: { params: { slug: string } }) {

    const searchParams = request.nextUrl.searchParams
 
    const search = searchParams.get('search')
   
    const response = {
        msg : 'todos 하나 가져오기',
        data : {
            id : params.slug,
            title : 'task1',
            isDone : false,
            query : search
        }
    }

    return NextResponse.json (response, {status : 201})
}

// delete todo
export async function DELETE(request : NextRequest, { params }: { params: { slug: string } }) {
   
    const response = {
        msg : 'todos delete 성공',
        data : {
            id : params.slug,
            title : 'task1',
            isDone : false
        }
    }

    return NextResponse.json (response, {status : 201})
}

// post todo
export async function POST(request : NextRequest, { params }: { params: { slug: string } }) {
   
    const data = await request.json()

    const editedTodo = {
        id : params.slug,
        title : data.title,
        isDone : data.isDone
    }

    const response = {
        msg : 'todos 수정 성공',
        data : {
            id : params.slug,
            title : 'task1',
            isDone : false
        }
    }

    return NextResponse.json (response, {status : 201})
}