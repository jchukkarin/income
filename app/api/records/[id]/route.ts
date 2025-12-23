import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = {
    params: Promise<{ id: string }>
}

// PUT: แก้ไขข้อมูล
export async function PUT(req: Request, { params }: Params) {
    const { id } = await params
    const body = await req.json()

    const record = await prisma.record.update({
        where: { id: Number(id) },
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
    const { id } = await params
    await prisma.record.delete({
        where: { id: Number(id) },
    })

    return NextResponse.json({ success: true })
}
