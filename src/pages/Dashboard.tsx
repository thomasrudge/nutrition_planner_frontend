import { Camera, Flame, Zap, Wheat, Beef } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const goals = [
  { label: "Calorias", current: 1450, target: 2200, unit: "kcal", icon: Flame, color: "text-accent" },
  { label: "Proteínas", current: 85, target: 150, unit: "g", icon: Beef, color: "text-primary" },
  { label: "Carboidratos", current: 180, target: 280, unit: "g", icon: Wheat, color: "text-accent" },
  { label: "Gorduras", current: 55, target: 80, unit: "g", icon: Zap, color: "text-primary" },
];

const meals = [
  { name: "Café da manhã", time: "08:30", calories: 450 },
  { name: "Almoço", time: "12:15", calories: 680 },
  { name: "Lanche", time: "15:00", calories: 320 },
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden animate-fade-in">
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] pointer-events-none animate-blob-delay" />


        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-heading font-bold text-foreground">Painel</h1>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Greeting */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Olá, Usuário 👋</h2>
              <p className="text-muted-foreground text-sm mt-1">Acompanhe suas metas nutricionais de hoje.</p>
            </div>

            {/* Upload CTA */}
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

            {/* Goals Grid */}
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

            {/* Recent Meals */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading">Refeições de Hoje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {meals.map((meal) => (
                  <div key={meal.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{meal.name}</p>
                      <p className="text-xs text-muted-foreground">{meal.time}</p>
                    </div>
                    <span className="text-sm font-heading font-semibold text-foreground">{meal.calories} kcal</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
