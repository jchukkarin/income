"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    ChartBarIcon,
    FolderIcon,
    ClipboardDocumentListIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const menu = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Dashboard", icon: ChartBarIcon, href: "/DashboardMeun" },
    { name: "Projects", icon: FolderIcon, href: "/RecordForm" }, // 👉 หน้า RecordForm
    { name: "Tasks", icon: ClipboardDocumentListIcon, href: "/tasks", badge: 8 },
    { name: "Reporting", icon: ChartBarIcon, href: "/reporting" },
    { name: "Users", icon: UserIcon, href: "/users" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r bg-white px-4 py-6">
            {/* Logo */}
            <h1 className="text-lg font-semibold text-gray-900 mb-6">
                Untitled UI
            </h1>

            <nav className="space-y-1">
                {menu.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                ${isActive
                                    ? "bg-gray-100 text-gray-900 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
              `}
                        >
                            <item.icon
                                className={`h-5 w-5 transition
                  ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-400 group-hover:text-gray-600"
                                    }
                `}
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
    );
}
