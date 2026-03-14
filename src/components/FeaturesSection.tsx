import { Camera, Target, TrendingUp, User, BarChart3, Utensils } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Fotografe e Analise",
    description: "Tire uma foto de qualquer refeição e nossa IA identifica os ingredientes e calcula os valores nutricionais instantaneamente.",
  },
  {
    icon: BarChart3,
    title: "Detalhamento Completo de Macros",
    description: "Obtenha dados detalhados de proteínas, carboidratos, gorduras, fibras, açúcar e micronutrientes para cada refeição.",
  },
  {
    icon: Target,
    title: "Defina Seus Objetivos",
    description: "Estabeleça metas personalizadas de calorias e macros com base nos seus objetivos de saúde e fitness.",
  },
  {
    icon: User,
    title: "Perfil Personalizado",
    description: "Insira seu peso, altura, gênero e nível de atividade para recomendações sob medida.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhe o Progresso",
    description: "Monitore tendências diárias, semanais e mensais com gráficos intuitivos e sequências.",
  },
  {
    icon: Utensils,
    title: "Histórico de Refeições",
    description: "Navegue pelo seu registro completo de refeições com dados nutricionais e veja padrões ao longo do tempo.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden" id="features">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-semibold text-primary font-heading tracking-widest uppercase mb-4">Funcionalidades</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">comer melhor</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Da análise instantânea de refeições ao acompanhamento de metas — cuidamos da sua nutrição.
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