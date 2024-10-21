"use client"

import { Container } from "@/components/customComponents/Container"
import { Loader } from "@/components/customComponents/Loader"
import { axiosInstance } from "@/utils/axiosInstance"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"

export default function Staff({ params }: { params: { clientId: string } }) {

    const [client, setClient] = useState<User>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/v1/client/${params.clientId}`)
                setClient(response.data.staff)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        !loading ?
        <Container className="w-[75vw]">
            <div className="w-full px-10 py-20">
                <div className="w-full flex items-center justify-start gap-3 text-3xl font-bold">
                    <span>{client?.firstName}</span>
                    <span>{client?.lastName}</span>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-0 mt-3 text-sm font-medium text-gray-500">
                    <span>@{client?.email}</span>
                    <span>{client?.phoneNumber}</span>
                </div>
            </div>
        </Container>
        : <Loader />
    )
}