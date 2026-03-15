import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Period = "week" | "month" | "year";

const weekData = [
  { day: "Seg", calories: 2050, protein: 130, carbs: 260, fat: 70 },
  { day: "Ter", calories: 1850, protein: 120, carbs: 230, fat: 65 },
  { day: "Qua", calories: 2300, protein: 155, carbs: 290, fat: 78 },
  { day: "Qui", calories: 1950, protein: 140, carbs: 245, fat: 68 },
  { day: "Sex", calories: 2100, protein: 145, carbs: 270, fat: 72 },
  { day: "Sáb", calories: 2400, protein: 135, carbs: 310, fat: 85 },
  { day: "Dom", calories: 1450, protein: 85, carbs: 180, fat: 55 },
];

const monthData = Array.from({ length: 4 }, (_, i) => ({
  day: `Sem ${i + 1}`,
  calories: 1800 + Math.round(Math.random() * 600),
  protein: 110 + Math.round(Math.random() * 50),
  carbs: 220 + Math.round(Math.random() * 80),
  fat: 55 + Math.round(Math.random() * 30),
}));

const yearData = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
].map((m) => ({
  day: m,
  calories: 1700 + Math.round(Math.random() * 700),
  protein: 100 + Math.round(Math.random() * 60),
  carbs: 200 + Math.round(Math.random() * 100),
  fat: 50 + Math.round(Math.random() * 35),
}));

const dataMap: Record<Period, typeof weekData> = {
  week: weekData,
  month: monthData,
  year: yearData,
};

const CALORIE_GOAL = 2200;

export function ProgressChart() {
  const [period, setPeriod] = useState<Period>("week");
  const data = dataMap[period];

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="font-heading">Progresso</CardTitle>
          <Tabs
            value={period}
            onValueChange={(v) => setPeriod(v as Period)}
          >
            <TabsList className="h-8">
              <TabsTrigger value="week" className="text-xs px-3 h-7">Semana</TabsTrigger>
              <TabsTrigger value="month" className="text-xs px-3 h-7">Mês</TabsTrigger>
              <TabsTrigger value="year" className="text-xs px-3 h-7">Ano</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 10% 15%)" />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(150 8% 55%)", fontSize: 12 }}
              axisLine={{ stroke: "hsl(150 10% 15%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(150 8% 55%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(150 15% 7%)",
                border: "1px solid hsl(150 10% 15%)",
                borderRadius: "0.5rem",
                color: "hsl(60 10% 92%)",
                fontSize: 13,
              }}
              labelStyle={{ color: "hsl(60 10% 92%)", fontWeight: 600 }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  calories: "Calorias",
                  protein: "Proteínas",
                  carbs: "Carboidratos",
                  fat: "Gorduras",
                };
                return [
                  `${value}${name === "calories" ? " kcal" : "g"}`,
                  labels[name] || name,
                ];
              }}
            />
            <Legend
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  calories: "Calorias",
                  protein: "Proteínas",
                  carbs: "Carboidratos",
                  fat: "Gorduras",
                };
                return labels[value] || value;
              }}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <ReferenceLine
              y={CALORIE_GOAL}
              stroke="hsl(38 92% 55%)"
              strokeDasharray="6 3"
              strokeWidth={2}
              label={{
                value: `Meta ${CALORIE_GOAL}`,
                fill: "hsl(38 92% 55%)",
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
            <Bar
              dataKey="calories"
              fill="hsl(145 72% 45%)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="protein"
              fill="hsl(145 72% 45% / 0.4)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="carbs"
              fill="hsl(38 92% 55% / 0.6)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="fat"
              fill="hsl(150 8% 55% / 0.5)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
