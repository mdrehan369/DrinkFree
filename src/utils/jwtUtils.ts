import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'
import { cookies } from 'next/headers'

export interface JwtPayloadData extends jwt.JwtPayload {
    id: number
    role: Role
}

export const generateAccessToken = (data: JwtPayloadData): void => {
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRY || '1d',
    })
    cookies().set('accessToken', token)
}

export const getdecodedToken = (): null | JwtPayloadData => {
    const token = cookies().get('accessToken')?.value
    if (!token) return null
    return jwt.decode(token) as JwtPayloadData
}
