import { Camera, Target, TrendingUp, User, BarChart3, Utensils } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Snap & Analyze",
    description: "Take a photo of any meal and our AI instantly identifies ingredients and calculates nutritional values.",
  },
  {
    icon: BarChart3,
    title: "Full Macro Breakdown",
    description: "Get detailed protein, carbs, fats, fiber, sugar, and micronutrient data for every meal.",
  },
  {
    icon: Target,
    title: "Set Your Goals",
    description: "Define personalized calorie and macro targets based on your fitness objectives.",
  },
  {
    icon: User,
    title: "Personalized Profile",
    description: "Input your weight, height, gender, and activity level for tailored recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor daily, weekly, and monthly trends with intuitive charts and streaks.",
  },
  {
    icon: Utensils,
    title: "Meal History",
    description: "Browse your complete meal log with nutritional data and see patterns over time.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="features">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold text-primary font-heading tracking-widest uppercase mb-4">Features</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">eat smarter</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From instant meal analysis to long-term goal tracking — we've got your nutrition covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
