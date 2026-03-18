import { UtensilsCrossed, Apple, Flame, Leaf, Utensils, Cherry, Egg, Fish } from "lucide-react";

const bgIcons = [
  { Icon: UtensilsCrossed, className: "top-[6%] left-[3%] rotate-[-20deg]" },
  { Icon: Apple, className: "top-[18%] right-[4%] rotate-[15deg]" },
  { Icon: Flame, className: "bottom-[22%] left-[7%] rotate-[25deg]" },
  { Icon: Leaf, className: "bottom-[8%] right-[3%] rotate-[-30deg]" },
  { Icon: Utensils, className: "top-[45%] right-[92%] rotate-[10deg]" },
  { Icon: Cherry, className: "top-[70%] right-[5%] rotate-[-10deg]" },
  { Icon: Egg, className: "top-[8%] left-[50%] rotate-[35deg]" },
  { Icon: Fish, className: "bottom-[40%] left-[92%] rotate-[-15deg]" },
];

const BackgroundIcons = () => (
  <>
    {bgIcons.map(({ Icon, className }, i) => (
      <Icon
        key={i}
        className={`absolute z-0 w-14 h-14 text-muted-foreground/[0.035] pointer-events-none select-none ${className}`}
      />
    ))}
  </>
);

export default BackgroundIcons;
