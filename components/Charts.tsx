"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

type ChartsProps = {
  initialValue: number;
}

const generateChartData = (initialValue: number) => {
  const data = [];
  let value = initialValue;

  for (let i = 0; i < 12; i++) {
    const month = new Date(0, i).toLocaleString('default', { month: 'long' });
    data.push({
      month,
      desktop: Math.round(value),
    });
    value *= 1.01; // Increment by 1% each month
  }

  return data;
}

const chartConfig = {
  desktop: {
    label: "1% increase monthly",
    color: "#2563eb",
  },
} satisfies ChartConfig

const Charts = ({ initialValue }: ChartsProps) => {
  const chartData = generateChartData(initialValue);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false}/>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={2} />
      </BarChart>
    </ChartContainer>
  )
}

export default Charts;
