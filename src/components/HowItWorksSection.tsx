import { Camera, Cpu, LineChart } from "lucide-react";
import appDashboard from "@/assets/app-dashboard.jpg";

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Snap Your Meal",
    description: "Take a quick photo of your plate — breakfast, lunch, dinner, or snack.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Does the Work",
    description: "Our model identifies every ingredient and calculates calories, protein, carbs, fats, and more.",
  },
  {
    icon: LineChart,
    number: "03",
    title: "Track & Improve",
    description: "View your daily intake against your goals and adjust your habits over time.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — phone mockup */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl" />
            <img
              src={appDashboard}
              alt="NutriSnap app dashboard showing nutrition tracking"
              className="relative w-[320px] rounded-[2rem] shadow-[var(--shadow-card)] border border-border"
            />
          </div>

          {/* Right — steps */}
          <div className="space-y-6">
            <p className="text-sm font-semibold text-primary font-heading tracking-widest uppercase">How it works</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Three steps to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">better nutrition</span>
            </h2>

            <div className="space-y-8 pt-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-semibold text-primary tracking-widest">STEP {step.number}</span>
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
