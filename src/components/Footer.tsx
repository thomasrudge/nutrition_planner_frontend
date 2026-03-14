import { Utensils } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Utensils className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-foreground">NutriSnap</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 NutriSnap. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;