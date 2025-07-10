
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, LineChart, Line, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "../_components/page-header";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const salesData = [
    { month: 'Jan', sales: 120, revenue: 102000 },
    { month: 'Feb', sales: 150, revenue: 125000 },
    { month: 'Mar', sales: 170, revenue: 145000 },
    { month: 'Apr', sales: 160, revenue: 138000 },
    { month: 'May', sales: 200, revenue: 175000 },
    { month: 'Jun', sales: 220, revenue: 198000 },
];

const topProductsData = [
    { name: 'A2 Ghee', sales: 150 },
    { name: 'A2 Paneer', sales: 120 },
    { name: 'A2 Milk', sales: 90 },
    { name: 'Curd', sales: 70 },
    { name: 'Butter', sales: 50 },
];

export default function AnalyticsPage() {
    return (
        <>
            <PageHeader>Analytics</PageHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>Last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">₹8,71,000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                         <CardDescription>Last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-3xl font-bold">820</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>New Customers</CardTitle>
                         <CardDescription>This month</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-3xl font-bold">+25</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 mt-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales & Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-80 w-full">
                             <LineChart data={salesData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" yAxisId="left" name="Sales" />
                                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" yAxisId="right" name="Revenue (₹)" />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={{}} className="h-80 w-full">
                            <BarChart data={topProductsData} layout="vertical" margin={{ left: 10 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={5} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
