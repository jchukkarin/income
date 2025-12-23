'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Record = {
  id: number
  type: 'income' | 'expense'
  amount: number
  reason: string
  date: string
}

type FormState = {
  type: 'income' | 'expense'
  amount: string
  reason: string
  date: string
}

export default function RecordForm() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])

  const [form, setForm] = useState<FormState>({
    type: 'income',
    amount: '',
    reason: '',
    date: '',
  })

  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    fetch('/api/records')
      .then(res => res.json())
      .then(data => setRecords(data))
  }, [])

  const submit = async () => {
    await fetch('/api/records', {
      method: 'POST',
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
    <div className="space-y-6">

      {/* FORM */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-xl text-green-500 font-bold text-center">➕ เพิ่มรายการ</h1>

        <input
          placeholder="จำนวนเงิน"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="text-lg text-gray-500 border p-2 w-full"
        />

        <input
          placeholder="รายละเอียด"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          className="text-lg text-gray-500 border p-2 w-full"
        />

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="text-lg text-gray-500 border p-2 w-full"
        />

        <button
          onClick={submit}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          บันทึกข้อมูล
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl text-green-500 font-bold mb-4">📄 รายการทั้งหมด</h2>

        <ul className="space-y-2">
          {records.map(r => (
            <li key={r.id} className="flex justify-between border-b pb-1">
              <span>{r.reason}</span>
              <span>{r.amount}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
