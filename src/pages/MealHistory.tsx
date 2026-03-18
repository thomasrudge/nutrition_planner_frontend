import { useState, useMemo } from "react";
import { Search, ChevronDown, Flame, Beef, Wheat, Zap, ImageIcon, UtensilsCrossed, Apple, Leaf, Utensils } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

type MealEntry = {
  id: number;
  type: "Café da manhã" | "Almoço" | "Jantar" | "Lanche";
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
};

type DayGroup = {
  date: Date;
  meals: MealEntry[];
};

// Empty — will be populated from backend
const mealData: DayGroup[] = [];

const mealTypeColors: Record<string, string> = {
  "Café da manhã": "bg-accent/20 text-accent",
  "Almoço": "bg-primary/20 text-primary",
  "Jantar": "bg-accent/20 text-accent",
  "Lanche": "bg-primary/20 text-primary",
};

const MealHistory = () => {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([0, 1]));

  const filteredData = useMemo(() => {
    return mealData
      .map((day) => {
        const meals = day.meals.filter((m) => {
          if (typeFilter !== "all" && m.type !== typeFilter) return false;
          return true;
        });
        return { ...day, meals };
      })
      .filter((day) => {
        if (day.meals.length === 0) return false;
        if (dateFrom && day.date < dateFrom) return false;
        if (dateTo && day.date > dateTo) return false;
        return true;
      });
  }, [typeFilter, dateFrom, dateTo]);

  const toggleDay = (idx: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-heading font-bold text-foreground">Histórico</h1>
          </div>

          {/* Filter Bar */}
          <Card className="mb-6 border-border bg-card">
            <CardContent className="p-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Filtrar</span>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] bg-secondary border-border">
                  <SelectValue placeholder="Tipo de refeição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Café da manhã">Café da manhã</SelectItem>
                  <SelectItem value="Almoço">Almoço</SelectItem>
                  <SelectItem value="Jantar">Jantar</SelectItem>
                  <SelectItem value="Lanche">Lanche</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-secondary border-border text-sm">
                    {dateFrom ? format(dateFrom, "dd/MM/yy") : "De"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    disabled={(d) => d > new Date()}
                    locale={ptBR}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-secondary border-border text-sm">
                    {dateTo ? format(dateTo, "dd/MM/yy") : "Até"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    disabled={(d) => d > new Date()}
                    locale={ptBR}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              {(typeFilter !== "all" || dateFrom || dateTo) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => { setTypeFilter("all"); setDateFrom(undefined); setDateTo(undefined); }}
                >
                  Limpar
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Day Groups */}
          <div className="space-y-4">
            {filteredData.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Nenhuma refeição registrada ainda.</p>
            )}

            {filteredData.map((day, idx) => {
              const totalCal = day.meals.reduce((s, m) => s + m.calories, 0);
              const isOpen = openDays.has(idx);

              return (
                <Collapsible key={day.date.toISOString()} open={isOpen} onOpenChange={() => toggleDay(idx)}>
                  <Card className="border-border bg-card overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                          <span className="font-heading font-semibold text-foreground">
                            {format(day.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({day.meals.length} {day.meals.length === 1 ? "refeição" : "refeições"})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Flame className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-accent">{totalCal} kcal</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-t border-border divide-y divide-border">
                        {day.meals.map((meal) => (
                          <button
                            key={meal.id}
                            onClick={() => navigate("/dashboard/revisao", { state: { readOnly: true, mealId: meal.id } })}
                            className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors text-left"
                          >
                            <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                              {meal.image ? (
                                <img src={meal.image} alt="" className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", mealTypeColors[meal.type])}>
                                  {meal.type}
                                </span>
                                <span className="text-xs text-muted-foreground">{meal.time}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-accent" />{meal.calories} kcal</span>
                                <span className="flex items-center gap-1"><Beef className="h-3 w-3 text-primary" />{meal.protein}g</span>
                                <span className="flex items-center gap-1"><Wheat className="h-3 w-3 text-accent" />{meal.carbs}g</span>
                                <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary" />{meal.fat}g</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MealHistory;
