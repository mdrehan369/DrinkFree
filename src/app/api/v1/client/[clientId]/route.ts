import { prismaClient } from '@/utils/prismaClient'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (
    req: NextRequest,
    { params }: { params: { staffId: string } }
) => {
    try {
        const id = Number(params.staffId)
        if (!id)
            return NextResponse.json(
                { message: 'No ID given or ID is invalid' },
                { status: 400 }
            )

        const client = await prismaClient.user.findFirst({
            where: {
                id: id,
            },
        })

        if (!client)
            return NextResponse.json(
                { message: 'No Client Found' },
                { status: 404 }
            )

        return NextResponse.json(
            { message: 'Fetched successfully', client: client },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({"message": "Server Error", "error": error}, { status: 500 })
    }
}
