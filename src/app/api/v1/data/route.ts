import { asyncHandler } from "@/utils/asyncHandler";
import { prismaClient } from "@/utils/prismaClient";
import { DataSchema } from "@/zod/zodSchema";
import { NextResponse, type NextRequest } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {

    const body = await req.json()

    const parsedData = DataSchema.parse(body)

    const data = await prismaClient.data.create({
        data: parsedData
    })

    return NextResponse.json({ "message": "Data Saved", data }, { status: 201 })

})