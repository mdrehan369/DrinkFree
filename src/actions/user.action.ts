"use server"

import { cookies } from "next/headers"

export const logout = async () => {
    try {
        cookies().delete("accessToken")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}