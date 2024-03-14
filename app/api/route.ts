import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {

    const response = {
        msg : 'hello',
        data : 'lol'
    }

    return NextResponse.json (response, {status : 201})
}