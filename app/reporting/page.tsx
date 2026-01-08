import { prisma } from "@/lib/prisma"
import { ReportingPage } from "@/components/Reporting"

export default async function Page() {
    const records = await prisma.record.findMany({
        orderBy: { date: 'desc' }
    })

    // Map Prisma records to Income interface expected by ReportingPage
    const incomes = records.filter(r => r.type === 'income').map(r => ({
        id: String(r.id),
        amount: r.amount,
        category: r.reason, // Using reason as category for now since schema doesn't have category
        description: r.reason,
        date: r.date.toISOString(),
    }))

    return (
        <div className="p-6 min-h-full bg-gray-50 dark:bg-gray-900">
            <ReportingPage incomes={incomes} />
        </div>
    )
}