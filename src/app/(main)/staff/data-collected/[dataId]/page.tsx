"use client"

import { Container } from "@/components/customComponents/Container";
import { Loader } from "@/components/customComponents/Loader";
import { axiosInstance } from "@/utils/axiosInstance";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Data({ params }: { params: { dataId: string } }) {

    const [data, setData] = useState<Prisma.DataGetPayload<{include: {client: true}}>>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/api/v1/data/${params.dataId}`)
                setData(response.data.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        !loading ?
        <Container className="w-[80vw] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1">
                <span>{data?.firstName}</span>
                <span>{data?.lastName}</span>
                <span>{data?.email}</span>
                <span>{data?.phoneNumber}</span>
                <span>{data?.gender}</span>
                {/* <span>{data?.createdAt.toLocaleDateString()}</span> */}
                <span>{data?.client.bussinessName}</span>
            </div>
        </Container>
        : <Loader />
    )
    
}