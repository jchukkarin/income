'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FormState = {
    type: 'income' | 'expense'
    amount: string
    reason: string
    date: string
}

type RecordFormProps = {
    initialData?: FormState
}

export default function RecordForm({ initialData }: RecordFormProps) {
    const router = useRouter()

    const [form, setForm] = useState<FormState>(
        initialData || {
            type: 'income',
            amount: '',
            reason: '',
            date: '',
        }
    )

    const isEdit = !!initialData

    const submit = async () => {
        await fetch('/api/records', {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                amount: Number(form.amount),
                date: new Date(form.date),
            }),
        })

        router.push('/')
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

            {/* Back Button */}
            <div className="flex items-center">
                <button
                    onClick={() => router.back()}
                    className="
            w-10 h-10 rounded-full
            flex items-center justify-center
            border border-gray-300
            hover:bg-gray-100 transition
          "
                >
                    <Image
                        src="/folder.png"
                        alt="Back"
                        width={18}
                        height={18}
                    />
                </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-800">
                {isEdit ? '✏️ แก้ไขรายการ' : '➕ เพิ่มรายการ'}
            </h1>

            {/* ประเภทรายการ */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    ประเภทรายการ
                </label>
                <select
                    value={form.type}
                    onChange={(e) =>
                        setForm({ ...form, type: e.target.value as 'income' | 'expense' })
                    }
                    className={`w-full text-sm text-gray-700 rounded-lg border-gray-400 border px-3 py-2 focus:outline-none focus:ring-2
            ${form.type === 'income'
                            ? 'border-green-400 focus:ring-green-300'
                            : 'border-red-400 focus:ring-red-300'
                        }`}
                >
                    <option value="">เลือกประเภท</option>
                    <option value="income">💰 รายรับ</option>
                    <option value="expense">💸 รายจ่าย</option>
                </select>
            </div>

            {/* จำนวนเงิน */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    จำนวนเงิน
                </label>
                <input
                    type="number"
                    placeholder="เช่น 500"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full text-sm text-gray-700 rounded-lg border-gray-400 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring- blue-300"
                />
            </div>

            {/* รายละเอียด */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    รายละเอียด
                </label>
                <input
                    placeholder="เช่น เงินเดือน / ค่าอาหาร"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="w-full text-sm text-gray-700 rounded-lg border-gray-400 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* วันที่ */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    วันที่
                </label>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full text-sm text-gray-700 rounded-lg border-gray-400 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
                <button
                    onClick={submit}
                    className={`w-full py-2.5 rounded-lg text-white font-semibold transition
            ${isEdit
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                </button>

                <button
                    onClick={() => router.back()}
                    className="w-full py-2.5 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
                >
                    ยกเลิก
                </button>
            </div>
        </div>
    )
}
