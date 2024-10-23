import { getdecodedToken } from "@/utils/jwtUtils";
import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { dataId: string } }) => {
    try {
        const { dataId } = params
        
        const user = await getdecodedToken()
        if(user?.role === "CLIENT")
            return NextResponse.json({ "message": "Not Authorized" }, { status: 403 })

        const data = await prismaClient.data.findUnique({
            where: {
                id: Number(dataId)
            },
            include: {
                client: true
            }
        })

        return NextResponse.json({ "message": "Fetched!", data }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ "message": "Server Error", error }, { status: 500 })
    }
}