import { asyncHandler } from "@/utils/asyncHandler";
import { getdecodedToken } from "@/utils/jwtUtils";
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

export const GET = asyncHandler(async (req: NextRequest) => {
    const decodedToken = await getdecodedToken()
    if (decodedToken?.role == "CLIENT")
        return NextResponse.json({ message: 'Not Authorized' }, { status: 403 })

    const search = req.nextUrl.searchParams.get('search') || ''
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 10
    const page = Number(req.nextUrl.searchParams.get('page')) || 0

    const datas = await prismaClient.data.findMany({
        where: {
            client: {
                bussinessName: {
                    contains: search
                }
            }
        },
        take: limit,
        skip: limit * page,
        include: {
            client: true
        }
    })

    return NextResponse.json({ message: 'Fetched', datas }, { status: 200 })
})