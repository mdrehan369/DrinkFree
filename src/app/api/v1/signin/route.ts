import { asyncHandler } from "@/utils/asyncHandler";
import { generateAccessToken } from "@/utils/jwtUtils";
import { prismaClient } from "@/utils/prismaClient";
import { UserSigninSchema } from "@/zod/zodSchema";
import { NextRequest, NextResponse } from "next/server";


export const POST = asyncHandler(async (req: NextRequest) => {

    const body = await req.json()

    // Check the schema
    const parsedData = UserSigninSchema.parse(body)

    const user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { email: parsedData.emailOrPhoneNumber },
                { phoneNumber: parsedData.emailOrPhoneNumber }
            ]
        }
    })

    if(!user) return NextResponse.json({ "message": "User does not exists" })
    
    if(prismaClient.user.checkPassword(user.password, parsedData.password)) {
        generateAccessToken({ role: user.role, id: user.id })
        user.password = ""
        return NextResponse.json({"message": "User loggedin successfully", "data": user})
    }

    return NextResponse.json({ "message": "Invalid password" })

})