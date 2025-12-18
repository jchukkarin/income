'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function CreatePage() {
const router = useRouter()
const [form, setForm] = useState({
type: 'income',
amount: '',
reason: '',
date: ''
})


const submit = async () => {
await fetch('/api/records', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
...form,
amount: Number(form.amount),
date: new Date(form.date)
})
})
router.push('/')
}


return (
<div className="p-8">
<h1 className="text-xl font-bold mb-4">➕ เพิ่มรายการ</h1>


<select onChange={e => setForm({ ...form, type: e.target.value })}>
<option value="income">รายรับ</option>
<option value="expense">รายจ่าย</option>
</select>


<input placeholder="จำนวนเงิน" type="number"
onChange={e => setForm({ ...form, amount: e.target.value })} />


<input placeholder="สาเหตุ"
onChange={e => setForm({ ...form, reason: e.target.value })} />


<input type="date"
onChange={e => setForm({ ...form, date: e.target.value })} />


<button onClick={submit} className="bg-green-500 text-white px-4 py-2 mt-4">
บันทึก
</button>
</div>
)
}