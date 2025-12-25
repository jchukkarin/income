'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon } from '@heroicons/react/24/outline'

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {

    const pathname = usePathname()

    return (
        <nav className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-1 -ml-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
                <h1 className="text-xl text-black font-bold">Income Tracker</h1>
            </div>

            <div className="flex gap-6">
                <Link
                    href="/"
                    className={pathname === "/"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600"}
                >
                    Home
                </Link>

                <Link
                    href="/create"
                    className={pathname === "/create"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600"}
                >
                    Projects
                </Link>
            </div>
        </nav>
    )
}
