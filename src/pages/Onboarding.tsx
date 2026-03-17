import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Target, Activity } from "lucide-react";

const activityLevels = [
  { value: "sedentary", label: "Sedentário", description: "Pouca ou nenhuma atividade física. Trabalho de escritório sem exercícios regulares." },
  { value: "light", label: "Levemente ativo", description: "Exercício leve 1–3 dias por semana, como caminhadas curtas ou tarefas domésticas." },
  { value: "moderate", label: "Moderadamente ativo", description: "Exercício moderado 3–5 dias por semana, como corrida, musculação ou esportes." },
  { value: "very_active", label: "Muito ativo", description: "Exercício intenso 6–7 dias por semana ou trabalho físico exigente." },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [calories, setCalories] = useState("2000");
  const [protein, setProtein] = useState("150");
  const [carbs, setCarbs] = useState("250");
  const [fat, setFat] = useState("65");
  const [activityLevel, setActivityLevel] = useState("moderate");

  const progressValue = (step / 3) * 100;

  const stepIcons = [
    <User key="user" className="h-5 w-5" />,
    <Target key="target" className="h-5 w-5" />,
    <Activity key="activity" className="h-5 w-5" />,
  ];

  const stepLabels = ["Dados Pessoais", "Metas", "Atividade"];

  const handleFinish = () => {
    // TODO: save onboarding data via API
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
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
          <Card className="border-border">
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
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="text-foreground" />
              </div>
              <Button className="w-full" onClick={() => setStep(2)} disabled={!height || !weight || !birthDate}>
                Próximo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Card className="border-border">
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
          <Card className="border-border">
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
