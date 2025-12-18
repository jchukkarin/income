'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'


export default function EditPage() {
const { id } = useParams()
const router = useRouter()
const [form, setForm] = useState<any>(null)


useEffect(() => {
fetch(`/api/records/${id}`)
.then(res => res.json())
.then(setForm)
}, [id])


if (!form) return <p>Loading...</p>


const submit = async () => {
await fetch(`/api/records/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(form)
})
router.push('/')
}


return (
<div className="p-8">
<h1 className="text-xl font-bold">✏️ แก้ไขรายการ</h1>


<input value={form.amount}
onChange={e => setForm({ ...form, amount: e.target.value })} />


<input value={form.reason}
onChange={e => setForm({ ...form, reason: e.target.value })} />


<button onClick={submit} className="bg-blue-500 text-white px-4 py-2 mt-4">
บันทึก
</button>
</div>
)
}