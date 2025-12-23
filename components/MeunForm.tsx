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

export default function MeunForm() {
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
        <div className="w-full max-w-4xl p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">ภาพรวม (Dashboard)</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="รายรับทั้งหมด" value={`฿${income.toLocaleString()}`} change="Total Income" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="รายจ่ายทั้งหมด" value={`฿${expense.toLocaleString()}`} change="Total Expense" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <StatCard title="คงเหลือ" value={`฿${balance.toLocaleString()}`} change="Net Balance" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">รายการล่าสุด</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 font-medium">วันที่</th>
                                <th className="px-6 py-4 font-medium">รายการ</th>
                                <th className="px-6 py-4 font-medium">ประเภท</th>
                                <th className="px-6 py-4 font-medium text-right">จำนวนเงิน</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {records.slice(-5).reverse().map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4">
                                        {new Date(record.date).toLocaleDateString('th-TH')}
                                    </td>
                                    <td className="px-6 py-4">{record.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.type === 'income'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {record.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-semibold ${record.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {record.type === 'income' ? '+' : '-'}{record.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}