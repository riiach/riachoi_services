import { NextResponse } from "next/server";

export function success(data, message = "SUCCESS", status = 200) {
    return NextResponse.json(
        {
            status,
            message,
            data,
        },
        { status }
    );
}

export function created(data, message = "CREATED") {
    return success(data, message, 201);
}

export function badRequest(message = "BAD_REQUEST") {
    return NextResponse.json(
        {
            status: 400,
            message,
            data: null,
        },
        { status: 400 }
    );
}

export function serverError(message = "INTERNAL_SERVER_ERROR") {
    return NextResponse.json(
        {
            status: 500,
            message,
            data: null,
        },
        { status: 500 }
    );
}