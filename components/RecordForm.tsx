'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Record = {
  id: number
  type: 'income' | 'expense' | 'remaining'
  amount: number
  reason: string
  date: string
}

type FormState = {
  type: 'income' | 'expense' | 'remaining'
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

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/records')
      if (res.ok) {
        const data = await res.json()
        setRecords(data)
      }
    } catch (error) {
      console.error("Failed to fetch records", error)
    }
  }

  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    fetchRecords()
  }, [])

  const submit = async () => {
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
          date: new Date(form.date),
        }),
      })

      if (res.ok) {
        // Refresh list
        await fetchRecords()
        // Clear form (optional but good UX)
        setForm({ ...form, amount: '', reason: '' })
      } else {
        const errorData = await res.json();
        console.error("Failed to save:", errorData)
        alert(`บันทึกไม่สำเร็จ: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error saving record:", error)
      alert(`เกิดข้อผิดพลาดในการบันทึก: ${error}`)
    }
  }

  return (
    <div className="space-y-6">

      {/* FORM */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-xl text-green-500 font-bold text-center">➕ เพิ่มรายการ</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setForm({ ...form, type: 'income' })}
            className={`px-4 py-2 rounded transition-colors ${form.type === 'income'
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            รายรับ
          </button>
          <button
            onClick={() => setForm({ ...form, type: 'expense' })}
            className={`px-4 py-2 rounded transition-colors ${form.type === 'expense'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            รายจ่าย
          </button>

          <button
            onClick={() => setForm({ ...form, type: 'remaining' })}
            className={`px-4 py-2 rounded transition-colors ${form.type === 'remaining'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
          >
            คงเหลือ
          </button>

          <div className="ml-2 text-sm text-gray-700 font-medium">
            สถานะ :
            <span className={`ml-2 ${form.type === 'income' ? 'text-green-600' :
              form.type === 'expense' ? 'text-red-600' : 'text-yellow-600'
              }`}>
              {
                form.type === 'income' ? 'รายรับ' :
                  form.type === 'expense' ? 'รายจ่าย' : 'คงเหลือ'
              }
            </span>
          </div>
        </div>

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
