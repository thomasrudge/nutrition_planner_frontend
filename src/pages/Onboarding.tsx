import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Target, Activity, Utensils, Apple, Flame, Leaf, UtensilsCrossed } from "lucide-react";

const activityLevels = [
  { value: "sedentary", label: "Sedentário", description: "Pouca ou nenhuma atividade física. Trabalho de escritório sem exercícios regulares." },
  { value: "light", label: "Levemente ativo", description: "Exercício leve 1–3 dias por semana, como caminhadas curtas ou tarefas domésticas." },
  { value: "moderate", label: "Moderadamente ativo", description: "Exercício moderado 3–5 dias por semana, como corrida, musculação ou esportes." },
  { value: "very_active", label: "Muito ativo", description: "Exercício intenso 6–7 dias por semana ou trabalho físico exigente." },
];

const months = [
  { value: "01", label: "Janeiro" }, { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" }, { value: "04", label: "Abril" },
  { value: "05", label: "Maio" }, { value: "06", label: "Junho" },
  { value: "07", label: "Julho" }, { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" }, { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const bgIcons = [
  { Icon: UtensilsCrossed, className: "top-[12%] left-[8%] rotate-[-15deg]" },
  { Icon: Apple, className: "top-[25%] right-[10%] rotate-[20deg]" },
  { Icon: Flame, className: "bottom-[30%] left-[5%] rotate-[10deg]" },
  { Icon: Leaf, className: "bottom-[15%] right-[7%] rotate-[-25deg]" },
  { Icon: Utensils, className: "top-[55%] left-[85%] rotate-[30deg]" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [calories, setCalories] = useState("2000");
  const [protein, setProtein] = useState("150");
  const [carbs, setCarbs] = useState("250");
  const [fat, setFat] = useState("65");
  const [activityLevel, setActivityLevel] = useState("moderate");

  const progressValue = (step / 3) * 100;
  const hasBirthDate = birthDay && birthMonth && birthYear;

  const stepIcons = [
    <User key="user" className="h-5 w-5" />,
    <Target key="target" className="h-5 w-5" />,
    <Activity key="activity" className="h-5 w-5" />,
  ];

  const stepLabels = ["Dados Pessoais", "Metas", "Atividade"];

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[260px] pointer-events-none animate-blob" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-accent/15 blur-[260px] pointer-events-none animate-blob-delay" />

      {/* Background logo & tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="flex items-center gap-3 opacity-[0.04]">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <Utensils className="w-8 h-8 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-7xl text-foreground">NutriSnap</span>
        </div>
        <span className="font-heading text-2xl text-foreground opacity-[0.03] mt-2">Sua nutrição inteligente</span>
      </div>

      {/* Scattered nutrition icons */}
      {bgIcons.map(({ Icon, className }, i) => (
        <Icon
          key={i}
          className={`absolute w-10 h-10 text-foreground opacity-[0.04] pointer-events-none ${className}`}
        />
      ))}

      <div className="w-full max-w-lg space-y-6 relative z-10">
        {/* Progress indicator */}
        <div className="space-y-4">
          <div className="flex justify-between">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  i + 1 <= step
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/40 text-muted-foreground"
                }`}>
                  {stepIcons[i]}
                </div>
                <span className={`text-xs font-medium ${i + 1 <= step ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <Card className="border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input id="height" type="number" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" placeholder="Ex: 72" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Data de nascimento</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Select value={birthDay} onValueChange={setBirthDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((d) => (
                        <SelectItem key={d} value={String(d).padStart(2, "0")}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthMonth} onValueChange={setBirthMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={birthYear} onValueChange={setBirthYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full" onClick={() => setStep(2)} disabled={!height || !weight || !hasBirthDate}>
                Próximo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Card className="border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Suas Metas Diárias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="calories">Calorias (kcal)</Label>
                <Input id="calories" type="number" placeholder="2000" value={calories} onChange={(e) => setCalories(e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="protein">Proteína (g)</Label>
                  <Input id="protein" type="number" placeholder="150" value={protein} onChange={(e) => setProtein(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carboidratos (g)</Label>
                  <Input id="carbs" type="number" placeholder="250" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Gorduras (g)</Label>
                  <Input id="fat" type="number" placeholder="65" value={fat} onChange={(e) => setFat(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Voltar</Button>
                <Button className="flex-1" onClick={() => setStep(3)} disabled={!calories || !protein || !carbs || !fat}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Card className="border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Nível de Atividade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <RadioGroup value={activityLevel} onValueChange={setActivityLevel} className="space-y-3">
                {activityLevels.map((level) => (
                  <label
                    key={level.value}
                    htmlFor={level.value}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      activityLevel === level.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-muted-foreground/40"
                    }`}
                  >
                    <RadioGroupItem value={level.value} id={level.value} className="mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{level.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Voltar</Button>
                <Button className="flex-1" onClick={handleFinish}>Começar</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
