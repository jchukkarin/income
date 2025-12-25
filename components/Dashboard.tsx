'use client'
import { useEffect, useState } from 'react'
import StatCard from './StatCard'

type Record = {
    id: number
    type: string
    amount: number
    reason: string
    date: string
}

export default function Dashboard() {
    const [records, setRecords] = useState<Record[]>([])

    useEffect(() => {
        fetch('/api/records').then(res => res.json()).then(setRecords)
    }, [])

    const income = records
        .filter(r => r.type === 'income')
        .reduce((sum, r) => sum + r.amount, 0)

    const expense = records
        .filter(r => r.type === 'expense')
        .reduce((sum, r) => sum + r.amount, 0)

    const balance = income - expense

    return (
        <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-black">ภาพรวม (Dashboard)</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="รายรับทั้งหมด" value={`฿${income.toLocaleString()}`} change="Total Income" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="รายจ่ายทั้งหมด" value={`฿${expense.toLocaleString()}`} change="Total Expense" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="คงเหลือ" value={`฿${balance.toLocaleString()}`} change="Net Balance" />
                </div>
            </div>
        </div>
    )
}