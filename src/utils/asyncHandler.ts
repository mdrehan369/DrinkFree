import { NextResponse, type NextRequest } from "next/server"

export const asyncHandler = (fn: any) => async (req: NextRequest) => {
    try {
        return await fn(req)
    } catch (error) {
        console.log(error)
        return NextResponse.json({"message": "Server Error", "error": error})
    }
}