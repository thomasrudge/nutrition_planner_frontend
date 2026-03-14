import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative p-12 md:p-20 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comece a acompanhar sua nutrição
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">hoje</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Junte-se a milhares de usuários que estão fazendo escolhas alimentares mais inteligentes com análise de refeições por IA.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] animate-pulse-glow gap-2 text-base px-10 py-6 rounded-xl font-heading font-semibold" asChild>
              <Link to="/auth">
                <Camera className="w-5 h-5" />
                Comece Agora — É Grátis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;