import { asyncHandler } from '@/utils/asyncHandler'
import { generateAccessToken } from '@/utils/jwtUtils'
import { prismaClient } from '@/utils/prismaClient'
import { UserSigninSchema } from '@/zod/zodSchema'
import { NextRequest, NextResponse } from 'next/server'

export const POST = asyncHandler(async (req: NextRequest) => {
    const body = await req.json()

    // Check the schema
    const parsedData = UserSigninSchema.parse(body)

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234'

    if (parsedData.emailOrPhoneNumber == ADMIN_EMAIL) {
        if (parsedData.password == ADMIN_PASSWORD) {
            generateAccessToken({ role: "ADMIN", id: 1 })
            return NextResponse.json({
                message: 'User loggedin successfully'
            }, { status: 200 })
        } else {
            return NextResponse.json({ "message": "Wrong Password" }, { status: 403 })
        }
    }

    const user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { email: parsedData.emailOrPhoneNumber },
                { phoneNumber: parsedData.emailOrPhoneNumber },
            ],
        },
    })

    if (!user) return NextResponse.json({ message: 'User does not exists' }, { status: 404 })

    if (prismaClient.user.checkPassword(user.password, parsedData.password)) {
        generateAccessToken({ role: user.role, id: user.id })
        user.password = ''
        return NextResponse.json({
            message: 'User loggedin successfully',
            data: user,
        }, { status: 200 })
    }

    return NextResponse.json({ message: 'Invalid password' }, { status: 403 })
})
