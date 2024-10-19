// components/dashboard/DashboardLayout.js
"use client"
import Link from 'next/link';

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex w-[100vw]">
      <nav className="w-[25vw] bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/register" className="hover:underline">
              Register
            </Link>
          </li>
          <li>
            <Link href="/admin/clients" className="hover:underline">
              Clients
            </Link>
          </li>
          <li>
            <Link href="/admin/staffs" className="hover:underline">
              Staffs
            </Link>
          </li>
          <li>
            <Link href="/admin/data-collected" className="hover:underline">
              Data Collected
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 bg-gray-100 h-[100vh] overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
