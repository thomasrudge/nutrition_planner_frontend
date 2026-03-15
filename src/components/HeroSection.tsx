import { Camera, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMeal from "@/assets/hero-meal.jpg";

interface HeroSectionProps {
  onOpenAuth: () => void;
}

const HeroSection = ({ onOpenAuth }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-dark)]" />
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Zap className="w-4 h-4" />
            Rastreamento Nutricional com IA
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Fotografe a refeição.
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Saiba seus macros.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Tire uma foto de qualquer prato e receba instantaneamente contagens detalhadas de calorias, macronutrientes e insights personalizados — tudo com IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onOpenAuth} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] gap-2 text-base px-8 py-6 rounded-xl font-heading font-semibold">
              <Camera className="w-5 h-5" />
              Comece Grátis
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 text-base px-8 py-6 rounded-xl font-heading font-semibold">
              Veja Como Funciona
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { value: "50K+", label: "Usuários ativos" },
              { value: "2M+", label: "Refeições analisadas" },
              { value: "98%", label: "Precisão" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative animate-float">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl" />
            <img
              src={heroMeal}
              alt="Uma refeição saudável e colorida analisada por IA"
              className="relative w-[420px] h-[420px] object-cover rounded-3xl shadow-[var(--shadow-card)] border border-border"
            />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card border border-border p-4 shadow-[var(--shadow-card)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-foreground">485 kcal</div>
                  <div className="text-xs text-muted-foreground">P: 32g · C: 45g · G: 18g</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;