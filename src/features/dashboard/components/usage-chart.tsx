import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

const usageData = [
  { date: 'Week 1', searches: 12, views: 8, unlocks: 3 },
  { date: 'Week 2', searches: 18, views: 14, unlocks: 5 },
  { date: 'Week 3', searches: 15, views: 9, unlocks: 2 },
  { date: 'Week 4', searches: 22, views: 16, unlocks: 6 },
]

export function UsageChart() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={usageData}>
        <XAxis
          dataKey='date'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Legend />
        <Bar
          dataKey='searches'
          name='Searches'
          fill='hsl(var(--primary))'
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey='views'
          name='Profile Views'
          fill='hsl(var(--primary) / 0.6)'
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey='unlocks'
          name='Unlocks'
          fill='hsl(var(--primary) / 0.3)'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
