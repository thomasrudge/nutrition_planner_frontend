import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl border border-border bg-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative p-12 md:p-20 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start tracking your nutrition
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">today</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of users who are making smarter food choices with AI-powered meal analysis.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] animate-pulse-glow gap-2 text-base px-10 py-6 rounded-xl font-heading font-semibold">
              <Camera className="w-5 h-5" />
              Get Started — It's Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
