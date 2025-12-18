'use client'

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
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {isEdit ? '✏️ แก้ไขรายการ' : '➕ เพิ่มรายการ'}
            </h1>

            {/* ประเภทรายการ */}
            <label className="block mb-2 font-medium">ประเภทรายการ</label>
            <select
                value={form.type}
                onChange={(e) =>
                    setForm({ ...form, type: e.target.value as 'income' | 'expense' })
                }
                className={`w-full p-2 rounded border mb-4
            ${form.type === 'income' ? 'border-green-400' : 'border-red-400'}`}
            >
                <option value="income">💰 รายรับ</option>
                <option value="expense">💸 รายจ่าย</option>
            </select>

            {/* จำนวนเงิน */}
            <label className="block mb-2 font-medium">จำนวนเงิน</label>
            <input
                type="number"
                placeholder="เช่น 500"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-2 rounded border mb-4 focus:outline-none focus:ring"
            />

            {/* เหตุผล */}
            <label className="block mb-2 font-medium">รายละเอียด</label>
            <input
                placeholder="เช่น เงินเดือน / ค่าอาหาร"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full p-2 rounded border mb-4"
            />

            {/* วันที่ */}
            <label className="block mb-2 font-medium">วันที่</label>
            <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2 rounded border mb-6"
            />

            {/* ปุ่ม */}
            <button
                onClick={submit}
                className={`w-full py-2 rounded text-white font-semibold
            ${isEdit
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
            >
                {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
            </button>

            <button
                onClick={() => router.back()}
                className="w-full mt-3 py-2 rounded border"
            >
                ยกเลิก
            </button>
        </div>
    )
}
