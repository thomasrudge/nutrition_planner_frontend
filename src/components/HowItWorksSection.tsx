import { Camera, Cpu, LineChart } from "lucide-react";
import appDashboard from "@/assets/app-dashboard.jpg";

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Fotografe Sua Refeição",
    description: "Tire uma foto rápida do seu prato — café da manhã, almoço, jantar ou lanche.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "A IA Faz o Trabalho",
    description: "Nosso modelo identifica cada ingrediente e calcula calorias, proteínas, carboidratos, gorduras e mais.",
  },
  {
    icon: LineChart,
    number: "03",
    title: "Acompanhe e Melhore",
    description: "Veja sua ingestão diária em relação às suas metas e ajuste seus hábitos ao longo do tempo.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl" />
            <img
              src={appDashboard}
              alt="Painel do app NutriSnap mostrando acompanhamento nutricional"
              className="relative w-[320px] rounded-[2rem] shadow-[var(--shadow-card)] border border-border"
            />
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold text-primary font-heading tracking-widest uppercase">Como Funciona</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Três passos para uma{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">nutrição melhor</span>
            </h2>

            <div className="space-y-8 pt-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-semibold text-primary tracking-widest">PASSO {step.number}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;