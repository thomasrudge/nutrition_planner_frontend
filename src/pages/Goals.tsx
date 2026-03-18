import { useEffect, useRef, useState } from "react";
import { Flame, Beef, Wheat, Zap, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import api from "@/lib/api";
import BackgroundIcons from "@/components/BackgroundIcons";
import { tr } from "date-fns/locale";

type GoalKey = "calories" | "protein" | "carbs" | "fats";

const goalConfig: { key: GoalKey; label: string; unit: string; icon: typeof Flame; color: string }[] = [
  { key: "calories", label: "Calorias", unit: "kcal", icon: Flame, color: "text-accent" },
  { key: "protein", label: "Proteínas", unit: "g", icon: Beef, color: "text-primary" },
  { key: "carbs", label: "Carboidratos", unit: "g", icon: Wheat, color: "text-accent" },
  { key: "fats", label: "Gorduras", unit: "g", icon: Zap, color: "text-primary" },
];

type WeekDay = "none";

const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// Empty goals — will be loaded from backend
const initialGoals: Record<GoalKey, number> = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
};

// No data until backend is connected
const weeklyData: Record<GoalKey, WeekDay[]> = {
  calories: ["none", "none", "none", "none", "none", "none", "none"],
  protein: ["none", "none", "none", "none", "none", "none", "none"],
  carbs: ["none", "none", "none", "none", "none", "none", "none"],
  fats: ["none", "none", "none", "none", "none", "none", "none"],
};

const dotColor: Record<string, string> = {
  hit: "bg-primary",
  missed: "bg-destructive",
  none: "bg-muted",
};


const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [editing, setEditing] = useState<GoalKey | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (key: GoalKey) => {
    setEditing(key);
    setEditValue(String(goals[key]));
  };

  const confirmEdit = () => {
    if (editing && editValue) {
      const num = parseInt(editValue, 10);
      if (!isNaN(num) && num > 0) {
        setGoals((prev) => ({ ...prev, [editing]: num }));
      }
    }
    setEditing(null);
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get('/user-goal');
        const data = response.data;
        setGoals({
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fats: data.fats,  // map fats -> 
        });
      } catch (error) {
        alert("Erro ao carregar metas...");
      }
    };
    fetchGoals();
  }, []); 

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const saveGoals = async () => {
      try {
        await api.patch('/user-goal', {
          calories: goals.calories,
          protein: goals.protein,
          carbs: goals.carbs,
          fats: goals.fats,
        });
      } catch (error) {
        alert("Erro ao salvar metas...");
      }
    };

    if (editing === null) {
      saveGoals();
    }
  }, [editing]);

  const cancelEdit = () => setEditing(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden animate-fade-in">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-blob" />
        {bgIcons.map(({ Icon, className }, i) => (
          <Icon key={i} className={`absolute w-16 h-16 text-muted-foreground/[0.04] pointer-events-none ${className}`} />
        ))}

        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-heading font-bold text-foreground">Metas</h1>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Suas Metas Diárias</h2>
              <p className="text-muted-foreground text-sm mt-1">Ajuste seus objetivos nutricionais e acompanhe seu progresso semanal.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goalConfig.map(({ key, label, unit, icon: Icon, color }) => (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editing === key ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-28 h-9"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") confirmEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <span className="text-sm text-muted-foreground">{unit}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={confirmEdit}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-heading font-bold text-foreground">
                          {goals[key] > 0 ? goals[key] : "—"}
                          <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => startEdit(key)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}

                    {/* Weekly summary */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Resumo semanal</p>
                      <div className="flex items-center gap-2">
                        {weeklyData[key].map((status, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <div className={`w-3.5 h-3.5 rounded-full ${dotColor[status]}`} />
                            <span className="text-[10px] text-muted-foreground">{dayLabels[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> Meta atingida</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-destructive" /> Meta não atingida</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-muted" /> Sem dados</div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Goals;
