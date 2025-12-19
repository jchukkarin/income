import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(_: Request, { params }: any) {
    const { id } = await params
    const data = await prisma.record.findUnique({
        where: { id: Number(id) }
    })
    return NextResponse.json(data)
}


export async function PUT(req: Request, { params }: any) {
    const { id } = await params
    const body = await req.json()
    const data = await prisma.record.update({
        where: { id: Number(id) },
        data: body
    })
    return NextResponse.json(data)
}


export async function DELETE(_: Request, { params }: any) {
    const { id } = await params
    await prisma.record.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
}