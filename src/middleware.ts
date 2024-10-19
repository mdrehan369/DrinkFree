"use server"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getdecodedToken } from "./utils/jwtUtils"

export async function middleware(req: NextRequest) {
    try {

        // Allowing all data enters
        if(req.nextUrl.pathname != '/' && req.nextUrl.pathname != '/admin' && req.nextUrl.pathname != '/staff') return NextResponse.next()
        const decodedToken = getdecodedToken()

        // Redirect to auth page if not signed in
        if(!decodedToken) return NextResponse.redirect(new URL('/auth/signin', req.url))

        // Redirect to admin section
        if(decodedToken.role === "ADMIN") return NextResponse.redirect(new URL('/admin', req.url))

        // Redirect to staff section
        if(decodedToken.role === "STAFF") return NextResponse.redirect(new URL('/staff', req.url))

        return NextResponse.next()

    } catch(err) {
        console.log(err)
    }
}

export const config = {
    matcher: [
        '/'
    ]
}