// components/dashboard/DashboardLayout.js
'use client'
import Link from 'next/link'
import {
    UserRoundPlus,
    LayoutDashboard,
    Database,
    Users,
    Contact,
} from 'lucide-react'

const DashboardLayout = ({ children }: any) => {
    return (
        <div className="flex w-[100vw]">
            <nav className="w-[20vw] bg-gray-800 text-white min-h-screen p-4">
                <div className=" w-full mt-10 flex items-center justify-center gap-2">
                    <LayoutDashboard />
                    <h2 className="text-xl text-center font-bold h-full">
                        Admin Dashboard
                    </h2>
                </div>
                <ul className="gap-2 flex flex-col items-center justify-start mt-16">
                    <Link
                        href="/admin/register"
                        className="w-[90%] cursor-pointer px-8 rounded-md text-lg font-bold flex items-center justify-start gap-2 p-2 hover:bg-gray-900 transition-colors duration-300">
                        <UserRoundPlus />
                        Register
                    </Link>

                    <Link
                        href="/admin/clients"
                        className="w-[90%] cursor-pointer px-8 rounded-md text-lg font-bold flex items-center justify-start gap-2 p-2 hover:bg-gray-900 transition-colors duration-300">
                        <Contact />
                        Clients
                    </Link>
                    
                    <Link
                        href="/admin/staffs"
                        className="w-[90%] cursor-pointer px-8 rounded-md text-lg font-bold flex items-center justify-start gap-2 p-2 hover:bg-gray-900 transition-colors duration-300">
                        <Users />
                        Staffs
                    </Link>

                    <Link
                        href="/admin/data-collected"
                        className="w-[90%] cursor-pointer px-8 rounded-md text-lg font-bold flex items-center justify-start gap-2 p-2 hover:bg-gray-900 transition-colors duration-300">
                        <Database />
                        Data Collected
                    </Link>
                    {/* </li> */}
                </ul>
            </nav>
            <main className="flex-1 bg-gray-100 h-[100vh] overflow-y-scroll">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
