"use client"

import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Income } from "./IncomeList";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from "date-fns";

interface ReportingPageProps {
    incomes: Income[];
}

const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

export function ReportingPage({ incomes }: ReportingPageProps) {
    // Calculate monthly data for last 6 months
    const last6Months = eachMonthOfInterval({
        start: subMonths(new Date(), 5),
        end: new Date(),
    });

    const monthlyData = last6Months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        const monthIncome = incomes
            .filter((income) => {
                const incomeDate = new Date(income.date);
                return incomeDate >= monthStart && incomeDate <= monthEnd;
            })
            .reduce((sum, income) => sum + income.amount, 0);

        return {
            month: format(month, "MMM yyyy"),
            income: monthIncome,
        };
    });

    // Calculate category breakdown
    const categoryData = incomes.reduce((acc, income) => {
        acc[income.category] = (acc[income.category] || 0) + income.amount;
        return acc;
    }, {} as Record<string, number>);

    const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
        name,
        value,
    }));

    // Calculate stats
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthIncome = incomes
        .filter((income) => {
            const incomeDate = new Date(income.date);
            return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear;
        })
        .reduce((sum, income) => sum + income.amount, 0);

    const lastMonth = subMonths(new Date(), 1);
    const lastMonthIncome = incomes
        .filter((income) => {
            const incomeDate = new Date(income.date);
            return (
                incomeDate.getMonth() === lastMonth.getMonth() &&
                incomeDate.getFullYear() === lastMonth.getFullYear()
            );
        })
        .reduce((sum, income) => sum + income.amount, 0);

    const monthlyGrowth = lastMonthIncome > 0
        ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100
        : 0;

    const averageIncome = monthlyData.length > 0
        ? monthlyData.reduce((sum, month) => sum + month.income, 0) / monthlyData.length
        : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reporting</h1>
                    <p className="text-muted-foreground">
                        รายงานและวิเคราะห์รายได้ของคุณ
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select defaultValue="6months">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1month">1 เดือนที่แล้ว</SelectItem>
                            <SelectItem value="3months">3 เดือนที่แล้ว</SelectItem>
                            <SelectItem value="6months">6 เดือนที่แล้ว</SelectItem>
                            <SelectItem value="1year">1 ปีที่แล้ว</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">รายได้รวม</p>
                            <p className="text-2xl font-bold mt-2">${totalIncome.toFixed(2)}</p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                            <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">เดือนนี้</p>
                            <p className="text-2xl font-bold mt-2">${thisMonthIncome.toFixed(2)}</p>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3">
                            <Calendar className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">การเติบโต</p>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-2xl font-bold">
                                    {monthlyGrowth > 0 ? "+" : ""}
                                    {monthlyGrowth.toFixed(1)}%
                                </p>
                                {monthlyGrowth >= 0 ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">ค่าเฉลี่ย/เดือน</p>
                            <p className="text-2xl font-bold mt-2">${averageIncome.toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Monthly Trend */}
                <Card className="p-6">
                    <h2 className="font-semibold mb-4">รายได้รายเดือน</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "6px",
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="income"
                                name="รายได้"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--primary))" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* Category Breakdown - Bar Chart */}
                <Card className="p-6">
                    <h2 className="font-semibold mb-4">รายได้ตามหมวดหมู่</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryChartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="name" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "6px",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="value" name="จำนวน" fill="hsl(var(--primary))" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Category Distribution - Pie Chart */}
                <Card className="p-6">
                    <h2 className="font-semibold mb-4">สัดส่วนหมวดหมู่</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "6px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>


            </div>
        </div>
    );
}
