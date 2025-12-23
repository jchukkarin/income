export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


// GET: ดึงรายการทั้งหมด
export async function GET() {
    const records = await prisma.record.findMany({
        orderBy: { date: "desc" },
    })

    return NextResponse.json(records)
}

// POST: เพิ่มรายการใหม่
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.amount || !body.date) {
            return NextResponse.json({ error: "Missing amount or date" }, { status: 400 })
        }

        const record = await prisma.record.create({
            data: {
                type: body.type,
                amount: body.amount,
                reason: body.reason,
                date: new Date(body.date),
            },
        })

        return NextResponse.json(record)
    } catch (error) {
        console.error("Failed to create record:", error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
