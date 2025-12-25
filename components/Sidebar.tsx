"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    HomeIcon,
    ChartBarIcon,
    FolderIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const menu = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Dashboard", icon: ChartBarIcon, href: "/DashboardMeun" },
    { name: "Projects", icon: FolderIcon, href: "/RecordForm" },
    { name: "Tasks", icon: ClipboardDocumentListIcon, href: "/tasks", badge: 8 },
    { name: "Reporting", icon: ChartBarIcon, href: "/reporting" },
    { name: "Users", icon: UserIcon, href: "/users" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white border-r px-4 py-6
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:hidden"}
        `}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg font-semibold text-gray-900">
                        ควยฝาก 'เผาผลาญไวกว่าแคลอรี่ ก็เงินในกระเป๋าเรานี่แหละ'
                    </h1>

                    <button
                        onClick={onClose}
                        className="lg:hidden"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="space-y-1">
                    {menu.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${isActive
                                        ? "bg-gray-100 text-gray-900 font-medium"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }
                `}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-400 group-hover:text-gray-600"
                                        }`}
                                />

                                <span className="flex-1">{item.name}</span>

                                {item.badge && (
                                    <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
