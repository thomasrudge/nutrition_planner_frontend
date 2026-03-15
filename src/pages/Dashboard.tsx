import { useState } from "react";
import { Camera, Flame, Zap, Wheat, Beef, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const goals = [
  { label: "Calorias", current: 1450, target: 2200, unit: "kcal", icon: Flame, color: "text-accent" },
  { label: "Proteínas", current: 85, target: 150, unit: "g", icon: Beef, color: "text-primary" },
  { label: "Carboidratos", current: 180, target: 280, unit: "g", icon: Wheat, color: "text-accent" },
  { label: "Gorduras", current: 55, target: 80, unit: "g", icon: Zap, color: "text-primary" },
];

type Meal = {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
};

const mealsByDate: Record<string, Meal[]> = {
  [format(new Date(), "yyyy-MM-dd")]: [
    { name: "Café da manhã", time: "08:30", calories: 450, protein: 25, carbs: 55, fat: 12 },
    { name: "Almoço", time: "12:15", calories: 680, protein: 40, carbs: 70, fat: 22 },
    { name: "Lanche", time: "15:00", calories: 320, protein: 20, carbs: 35, fat: 10 },
  ],
  [format(subDays(new Date(), 1), "yyyy-MM-dd")]: [
    { name: "Café da manhã", time: "07:45", calories: 380, protein: 18, carbs: 48, fat: 14 },
    { name: "Almoço", time: "12:30", calories: 720, protein: 45, carbs: 65, fat: 28 },
    { name: "Lanche", time: "16:00", calories: 200, protein: 10, carbs: 28, fat: 6 },
    { name: "Jantar", time: "19:30", calories: 550, protein: 35, carbs: 50, fat: 18 },
  ],
  [format(subDays(new Date(), 2), "yyyy-MM-dd")]: [
    { name: "Café da manhã", time: "08:00", calories: 420, protein: 22, carbs: 52, fat: 11 },
    { name: "Almoço", time: "13:00", calories: 650, protein: 38, carbs: 72, fat: 20 },
  ],
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const meals = mealsByDate[dateKey] || [];
  const isToday = format(new Date(), "yyyy-MM-dd") === dateKey;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden animate-fade-in">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] pointer-events-none animate-blob-delay" />

        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-heading font-bold text-foreground">Painel</h1>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Olá, Usuário 👋</h2>
              <p className="text-muted-foreground text-sm mt-1">Acompanhe suas metas nutricionais de hoje.</p>
            </div>

            <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">Registrar refeição</h3>
                  <p className="text-muted-foreground text-sm">Tire uma foto do seu prato para análise nutricional.</p>
                </div>
                <Button size="lg" className="rounded-lg font-heading font-semibold gap-2">
                  <Camera className="w-5 h-5" />
                  Fotografar Prato
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map((goal) => {
                const pct = Math.round((goal.current / goal.target) * 100);
                return (
                  <Card key={goal.label}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{goal.label}</CardTitle>
                      <goal.icon className={`w-4 h-4 ${goal.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-heading font-bold text-foreground">
                        {goal.current}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/ {goal.target} {goal.unit}</span>
                      </div>
                      <Progress value={pct} className="mt-3 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{pct}% da meta</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Meals with Day Navigation */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading">
                    {isToday ? "Refeições de Hoje" : "Refeições"}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedDate((d) => subDays(d, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-foreground min-w-[140px] text-center capitalize">
                      {isToday
                        ? "Hoje"
                        : format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={isToday}
                      onClick={() => setSelectedDate((d) => addDays(d, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                {meals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma refeição registrada neste dia.
                  </p>
                ) : (
                  meals.map((meal) => (
                    <div key={meal.name} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                      <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{meal.name}</p>
                          <span className="text-sm font-heading font-semibold text-foreground">{meal.calories} kcal</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{meal.time}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-primary font-medium">{meal.protein}g prot</span>
                          <span className="text-xs text-accent font-medium">{meal.carbs}g carb</span>
                          <span className="text-xs text-muted-foreground font-medium">{meal.fat}g gord</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
