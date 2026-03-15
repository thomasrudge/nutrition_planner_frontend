import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
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
import { TrendingUp } from "lucide-react";

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

const dataMap: Record<Period, typeof weekData> = { week: weekData, month: monthData, year: yearData };

const GOALS = { calories: 2200, protein: 150, carbs: 280, fat: 80 };

const axisStyle = { fill: "hsl(150 8% 55%)", fontSize: 12 };
const gridStroke = "hsl(150 10% 15%)";
const tooltipStyle = {
  backgroundColor: "hsl(150 15% 7%)",
  border: "1px solid hsl(150 10% 15%)",
  borderRadius: "0.5rem",
  color: "hsl(60 10% 92%)",
  fontSize: 13,
};

const COLORS = {
  calories: "hsl(145 72% 45%)",
  protein: "hsl(145 72% 45%)",
  carbs: "hsl(38 92% 55%)",
  fat: "hsl(150 8% 55%)",
};

export function ProgressChart() {
  const [period, setPeriod] = useState<Period>("week");
  const data = dataMap[period];

  const hitPct = useMemo(() => {
    const hits = data.filter((d) => d.calories >= GOALS.calories).length;
    return Math.round((hits / data.length) * 100);
  }, [data]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="font-heading">Progresso</CardTitle>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList className="h-8">
              <TabsTrigger value="week" className="text-xs px-3 h-7">Semana</TabsTrigger>
              <TabsTrigger value="month" className="text-xs px-3 h-7">Mês</TabsTrigger>
              <TabsTrigger value="year" className="text-xs px-3 h-7">Ano</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hit-rate stat */}
        <div className="flex items-center gap-2 px-1">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Meta calórica atingida em{" "}
            <span className="font-semibold text-foreground">{hitPct}%</span> dos dias
          </span>
        </div>

        {/* Chart 1 — Calories */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Calorias (kcal)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="day" tick={axisStyle} axisLine={{ stroke: gridStroke }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "hsl(60 10% 92%)", fontWeight: 600 }}
                formatter={(v: number) => [`${v} kcal`, "Calorias"]}
              />
              <ReferenceLine
                y={GOALS.calories}
                stroke="hsl(38 92% 55%)"
                strokeDasharray="6 3"
                strokeWidth={2}
                label={{ value: `Meta ${GOALS.calories}`, fill: "hsl(38 92% 55%)", fontSize: 11, position: "insideTopRight" }}
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke={COLORS.calories}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.calories, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 — Macros */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Macronutrientes (g)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="day" tick={axisStyle} axisLine={{ stroke: gridStroke }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "hsl(60 10% 92%)", fontWeight: 600 }}
                formatter={(v: number, name: string) => {
                  const labels: Record<string, string> = { protein: "Proteínas", carbs: "Carboidratos", fat: "Gorduras" };
                  return [`${v}g`, labels[name] || name];
                }}
              />
              <Legend
                formatter={(v: string) => {
                  const labels: Record<string, string> = { protein: "Proteínas", carbs: "Carboidratos", fat: "Gorduras" };
                  return labels[v] || v;
                }}
                wrapperStyle={{ fontSize: 12, paddingTop: 8, cursor: "pointer" }}
              />
              <ReferenceLine y={GOALS.protein} stroke={COLORS.protein} strokeDasharray="4 3" strokeWidth={1.5} />
              <ReferenceLine y={GOALS.carbs} stroke={COLORS.carbs} strokeDasharray="4 3" strokeWidth={1.5} />
              <ReferenceLine y={GOALS.fat} stroke={COLORS.fat} strokeDasharray="4 3" strokeWidth={1.5} />
              <Line
                type="monotone"
                dataKey="protein"
                stroke={COLORS.protein}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.protein, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="carbs"
                stroke={COLORS.carbs}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.carbs, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="fat"
                stroke={COLORS.fat}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.fat, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
