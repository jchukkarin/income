import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = {
  params: { id: string }
}

// PUT: แก้ไขข้อมูล
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()

  const record = await prisma.record.update({
    where: { id: Number(params.id) },
    data: {
      type: body.type,
      amount: body.amount,
      reason: body.reason,
      date: new Date(body.date),
    },
  })

  return NextResponse.json(record)
}

// DELETE: ลบข้อมูล
export async function DELETE(_: Request, { params }: Params) {
  await prisma.record.delete({
    where: { id: Number(params.id) },
  })

  return NextResponse.json({ success: true })
}
