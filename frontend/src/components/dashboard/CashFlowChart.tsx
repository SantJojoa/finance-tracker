import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { TooltipProps } from 'recharts'

import GlassCard from '@/components/ui/GlassCard'

interface CashFlowData {
    month: string
    income: number
    expenses: number
}

interface CashFlowChartProps {
    data: CashFlowData[]
}

const tooltipFormatter: TooltipProps<string | number, string>['formatter'] = (value) => {
    const numericValue = typeof value === 'number' ? value : Number(value)
    const formatted = Number.isFinite(numericValue) ? numericValue.toFixed(2) : '-'
    return [`$${formatted}`, '']
}

export default function CashFlowChart({ data }: CashFlowChartProps) {
    return (
        <GlassCard className="p-6">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="text-lg font-bold mb-1">Flujo de efectivo</h3>
                    <p className="text-text-dim text-sm">Ingresos vs Gastos - Últimos 6 meses</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-text-dim">Ingresos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs text-text-dim">Gastos</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" opacity={0.3} />
                        <XAxis
                            dataKey="month"
                            stroke="#9db9a4"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#9db9a4"
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#13131a',
                                border: '1px solid #2a2a35',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            formatter={tooltipFormatter}
                            labelFormatter={(label) => label}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#2bee5b"
                            strokeWidth={3}
                            dot={{ fill: '#2bee5b', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expenses"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ fill: '#ef4444', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    )
}