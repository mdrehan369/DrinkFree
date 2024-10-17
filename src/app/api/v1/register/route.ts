import { NextResponse, type NextRequest } from "next/server";
import { asyncHandler } from "@/utils/asyncHandler";
import { UserSchema } from "@/zod/zodSchema";
import { prismaClient } from "@/utils/prismaClient";
import { getdecodedToken } from "@/utils/jwtUtils";

export const POST = asyncHandler(async (req: NextRequest) => {

    const decodedToken = getdecodedToken()
    if(!decodedToken || decodedToken.role === "STAFF" || decodedToken.role === "CLIENT")
        return NextResponse.json({ "message": "Not authorized!" })


    const body = await req.json()

    // Check the body schema for further parsing
    const parsedData = UserSchema.parse(body)

    const user = await prismaClient.user.findFirst({
        where: {
            OR: [
                { email: parsedData.email },
                { phoneNumber: parsedData.phoneNumber }
            ]
        }
    })

    if(user) return NextResponse.json({ "message": "User already exists" })
    
    const newUser = await prismaClient.user.create({
        data: {
            ...parsedData,
            address: {
                create: parsedData.address
            }
        }
    })

    newUser.password = ""

    return NextResponse.json({"message": "User created successfully", "user": newUser})
})