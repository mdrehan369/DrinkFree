"use client"

import { Container } from "@/components/customComponents/Container"
import { Loader } from "@/components/customComponents/Loader"
import { axiosInstance } from "@/utils/axiosInstance"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"

export default function Staff({ params }: { params: { staffId: string } }) {

    const [staff, setStaff] = useState<User>()
    const [loading, setLoading] = useState(false)
    // const { toast } = useToast()

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/v1/staff/${params.staffId}`)
                setStaff(response.data.staff)
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
                    <span>{staff?.firstName}</span>
                    <span>{staff?.lastName}</span>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-0 mt-3 text-sm font-medium text-gray-500">
                    <span>@{staff?.email}</span>
                    <span>{staff?.phoneNumber}</span>
                </div>
            </div>
        </Container>
        : <Loader />
    )
}