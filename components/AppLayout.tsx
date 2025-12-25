'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }, [])

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    )
}
