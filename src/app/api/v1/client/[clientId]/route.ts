import { getdecodedToken } from '@/utils/jwtUtils'
import { prismaClient } from '@/utils/prismaClient'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (
    req: NextRequest,
    { params }: { params: { clientId: string } }
) => {
    try {
        // const decodedToken = await getdecodedToken()
        // if (decodedToken?.role == 'CLIENT')
        //     return NextResponse.json(
        //         { message: 'Not Authorized' },
        //         { status: 403 }
        //     )

        const id = params.clientId
        if (!id)
            return NextResponse.json(
                { message: 'No ID given or ID is invalid' },
                { status: 400 }
            )

        let client = await prismaClient.user.findFirst({
            where: {
                OR: [{ bussinessName: id }, { id: Number(id) || 0 }],
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
        return NextResponse.json(
            { message: 'Server Error', error: error },
            { status: 500 }
        )
    }
}
