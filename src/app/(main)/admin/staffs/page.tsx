'use client'

import { Container } from '@/components/customComponents/Container'
import { Loader } from '@/components/customComponents/Loader'
import { SearchBar } from '@/components/customComponents/SearchBar'
import { axiosInstance } from '@/utils/axiosInstance'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Query = {
    search: string
    limit: Number
    page: Number
}

export default function Clients() {
    const [staffs, setStaffs] = useState<Array<User>>([])
    const [loading, setLoading] = useState(false)
    const [queries, setQueries] = useState<Query>({
        search: '',
        limit: 10,
        page: 0,
    })
    const router = useRouter()

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(
                    `/api/v1/staff?search=${queries.search}&limit=${queries.limit}&page=${queries.page}`
                )
                setStaffs(response.data.staffs)
                console.log(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [queries])

    return (
        <Container className="w-[75vw] h-[100vh] flex flex-col items-center justify-start py-10">
            <SearchBar
                value={queries.search}
                setValue={(val: string) =>
                    setQueries((prev) => ({ ...prev, search: val }))
                }
            />
            <div className='w-[100%] h-[90%] overflow-y-scroll flex flex-col items-center justify-start gap-2 mt-10 px-2'>
                {!loading ? (
                    staffs.length === 0 ?
                        <div className='w-full h-[100%] flex items-center justify-center'>
                            No Staff Found!
                        </div>:

                    staffs.map((staff) => (
                        <div
                        onClick={() => router.push(`/admin/staffs/${staff.id}`)}
                        key={staff.id}
                        className="flex flex-col items-start justify-between w-[80%] bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-300 px-5 gap-1 rounded-sm p-2 border-[1px] border-gray-500">
                            <div className="w-full font-bold text-lg space-x-2">
                                <span>{staff.firstName}</span>
                                <span>{staff.lastName}</span>
                            </div>
                            <span className="w-full text-xs text-gray-600">
                                @{staff.email}
                            </span>
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
            </div>
        </Container>
    )
}
