// export const dynamic = "force-dynamic"

import { asyncHandler } from '@/utils/asyncHandler'
import { getdecodedToken } from '@/utils/jwtUtils'
import { prismaClient } from '@/utils/prismaClient'
// import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = asyncHandler(async (req: NextRequest) => {
    const decodedToken = await getdecodedToken()
    if (decodedToken?.role != 'ADMIN')
        return NextResponse.json({ message: 'Not Authorized' }, { status: 403 })

    const search = req.nextUrl.searchParams.get('search') || ''
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 10
    const page = Number(req.nextUrl.searchParams.get('page')) || 0

    const staffs = await prismaClient.user.findMany({
        where: {
            AND: [
                { role: 'STAFF' },
                {
                    OR: [
                        {
                            firstName: {
                                contains: search,
                            },
                        },
                        {
                            lastName: {
                                contains: search,
                            },
                        },
                    ],
                },
            ]
        },
        take: limit,
        skip: limit * page
    })

    return NextResponse.json({ message: 'Fetched', staffs }, { status: 200 })
})
