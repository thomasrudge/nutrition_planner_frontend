import { useState } from "react";
import { ArrowLeft, Pencil, Check, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import api from "@/lib/api";

type FoodItem = {
  MealItemId: number;
  name: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

const bgIcons = [
  { Icon: UtensilsCrossed, className: "top-[12%] left-[8%] rotate-[-15deg]" },
  { Icon: Apple, className: "top-[25%] right-[10%] rotate-[20deg]" },
  { Icon: Flame, className: "bottom-[30%] left-[5%] rotate-[10deg]" },
  { Icon: Leaf, className: "bottom-[15%] right-[7%] rotate-[-25deg]" },
  { Icon: Utensils, className: "top-[55%] left-[85%] rotate-[30deg]" },
];

const MealReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mealItems = (location.state?.items as FoodItem[]) || [];
  const mealImage = (location.state?.imagePreview as string) || "";
  const mealId = (location.state?.meal?.MealId as string) || "";

  const [items, setItems] = useState<FoodItem[]>(mealItems);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<FoodItem>>({});
  const [notes, setNotes] = useState("");

  const totals = items.reduce(
    (acc, item) => ({
      
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const startEdit = (item: FoodItem) => {
    setEditingId(item.MealItemId);
    setEditValues({ quantity: item.quantity, calories: item.calories, protein: item.protein, carbs: item.carbs, fats: item.fats });
  };

  const saveEdit = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.MealItemId === id ? { ...item, ...editValues } : item))
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.MealItemId !== id));

  const handleSave = async () => {
  try {
    // Update notes on the meal
    if (notes) {
      await api.patch(`/meal/${mealId}`, { notes });
    }

    navigate("/dashboard");
  } catch (error) {
    alert("Erro ao salvar refeição!");
    console.log(error);
  }
};

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {bgIcons.map(({ Icon, className }, i) => (
          <Icon key={i} className={`absolute w-16 h-16 text-muted-foreground/[0.04] pointer-events-none ${className}`} />
        ))}
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/upload")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Revisão de Refeição
            </h1>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left — Photo */}
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-secondary flex items-center justify-center">
                  {mealImage ? (
                    <img src={mealImage} alt="Refeição" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-muted-foreground text-sm">Nenhuma foto disponível</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right — Detected Items + Totals */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-5 space-y-1">
                  <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Itens Detectados
                  </h2>
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Nenhum item detectado. Envie uma foto para análise.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => {
                        const isEditing = editingId === item.MealItemId;
                        return (
                          <div
                            key={item.MealItemId}
                            className="rounded-lg border border-border bg-secondary/50 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-foreground">{item.name}</span>
                              <div className="flex items-center gap-1">
                                {isEditing ? (
                                  <>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary" onClick={() => saveEdit(item.MealItemId)}>
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={cancelEdit}>
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => startEdit(item)}>
                                      <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.MealItemId)}>
                                      <X className="h-3.5 w-3.5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>

                            {isEditing ? (
                              <div className="grid grid-cols-5 gap-2">
                                {(["quantity", "calories", "protein", "carbs", "fats"] as const).map((field) => (
                                  <div key={field} className="space-y-1">
                                    <label className="text-[10px] uppercase text-muted-foreground">
                                      {field === "quantity" ? "g" : field === "calories" ? "kcal" : field === "protein" ? "prot" : field === "carbs" ? "carb" : "gord"}
                                    </label>
                                    <Input
                                      type="number"
                                      className="h-8 text-xs"
                                      value={editValues[field] ?? ""}
                                      onChange={(e) =>
                                        setEditValues((v) => ({ ...v, [field]: parseFloat(e.target.value) || 0 }))
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span>{item.quantity}g</span>
                                <span className="text-accent">{item.calories} kcal</span>
                                <span>P {item.protein}g</span>
                                <span>C {item.carbs}g</span>
                                <span>G {item.fats}g</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Totals */}
              <Card>
                <CardContent className="p-5">
                  <h2 className="text-lg font-heading font-semibold text-foreground mb-3">
                    Total da Refeição
                  </h2>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { label: "Calorias", value: totals.calories, unit: "kcal", highlight: true },
                      { label: "Proteínas", value: totals.protein, unit: "g" },
                      { label: "Carboidratos", value: totals.carbs, unit: "g" },
                      { label: "Gorduras", value: totals.fats, unit: "g" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg bg-secondary p-3">
                        <p className="text-[10px] uppercase text-muted-foreground mb-1">{m.label}</p>
                        <p className={`text-lg font-bold ${m.highlight ? "text-accent" : "text-primary"}`}>
                          {m.value.toFixed(1)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{m.unit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardContent className="p-5 space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Observações</label>
                  <Textarea
                    placeholder="Adicione notas sobre esta refeição..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-heading font-semibold"
                  onClick={() => navigate("/dashboard/upload")}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl font-heading font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(145_72%_45%/0.3)]"
                  onClick={handleSave}
                >
                  Salvar Refeição
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MealReview;
