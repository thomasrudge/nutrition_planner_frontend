import { useCallback, useEffect, useState } from "react";
import { Camera, Flame, Zap, Wheat, Beef, ChevronLeft, ChevronRight, CalendarIcon, Trash2 } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProgressChart } from "@/components/ProgressChart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";



type Meal = {
  MealId: string;
  name: string;
  date: string;
  photoUrl: string;
  mealItem: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    quantity: number;
  }[];
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const isToday = format(new Date(), "yyyy-MM-dd") === dateKey;
  const [userName, setUserName] = useState("Usuário");
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const [targets, setTargets] = useState({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
  const [consumed, setConsumed] = useState({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });

  // Goals default to 0 until loaded from backend
  const goals = [
    { label: "Calorias", current: Math.round(consumed.calories), target: targets.calories, unit: "kcal", icon: Flame, color: "text-accent" },
    { label: "Proteínas", current: Math.round(consumed.protein), target: targets.protein, unit: "g", icon: Beef, color: "text-primary" },
    { label: "Carboidratos", current: Math.round(consumed.carbs), target: targets.carbs, unit: "g", icon: Wheat, color: "text-accent" },
    { label: "Gorduras", current: Math.round(consumed.fats), target: targets.fats, unit: "g", icon: Zap, color: "text-primary" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.name.split(" ")[0]);
      } catch {
        // keep default
      }
    };

    fetchUser();
  }, []);

    const fetchMeals = useCallback(async () => {
      try {
        const response = await api.get(`/meal/date/${dateKey}`);
        console.log("Refeições carregadas:", response.data);
        setMeals(response.data);

        const totalsResponse = await api.get(`/meal/daily-totals/${dateKey}`);
        setConsumed(totalsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar refeições:", error);
      }
    }, [dateKey]);

    useEffect(() => {
      fetchMeals();
    }, [fetchMeals]);


  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get('/user-goal');
        const data = response.data;
        setTargets({
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fats: data.fats,
        });
      } catch (error) {
        console.error("Erro ao carregar metas:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleNavUpload = () => {
    navigate("/dashboard/upload");
  }

  const handleDeleteMeal = async (mealId: string) => {
    try {
      await api.delete(`/meal/${mealId}`);
      await fetchMeals(); // Refresh totals
    } catch {
      alert("Erro ao deletar refeição!");
    }
  };

  

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden animate-fade-in">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-blob-delay" />

        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-heading font-bold text-foreground">Painel</h1>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Olá, {userName} 👋</h2>
              <p className="text-muted-foreground text-sm mt-1">Acompanhe suas metas nutricionais de hoje.</p>
            </div>

            <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">Registrar refeição</h3>
                  <p className="text-muted-foreground text-sm">Tire uma foto do seu prato para análise nutricional.</p>
                </div>
                <Button size="lg" className="rounded-lg font-heading font-semibold gap-2" onClick={handleNavUpload}>
                  <Camera className="w-5 h-5" />
                  Fotografar Prato
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map((goal) => {
                const pct = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
                const pct_bar = goal.target > 0 ? Math.min(Math.round((goal.current / goal.target) * 100), 100) : 0;
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
                      <Progress value={pct_bar} className="mt-3 h-2" />
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
                    {isToday ? "Refeições de Hoje" : "Refeições de " + format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} 
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
                        <div className="h-11 w-11 rounded-full overflow-hidden bg-muted shrink-0">
                          {meal.photoUrl ? (
                            <img 
                              src={`http://localhost:3000/${meal.photoUrl.replace('./', '')}`} 
                              alt={meal.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Camera className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{meal.name}</p>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteMeal(meal.MealId)}>
                            <X className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-heading font-semibold text-foreground">{Math.round(meal.mealItem.reduce((sum, item) => sum + item.calories, 0))} kcal</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(meal.date), "HH:mm")}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-primary font-medium">{Math.round(meal.mealItem.reduce((sum, item) => sum + item.protein, 0))}g prot</span>
                          <span className="text-xs text-accent font-medium">{Math.round(meal.mealItem.reduce((sum, item) => sum + item.carbs, 0))}g carb</span>
                          <span className="text-xs text-foreground font-medium">{Math.round(meal.mealItem.reduce((sum, item) => sum + item.fats, 0))}g gord</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            {/* Progress Chart */}
            <ProgressChart />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
