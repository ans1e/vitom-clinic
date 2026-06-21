import Image from "next/image";

import { Reveal } from "@/components/shared/Reveal";

const ADVANTAGES = [
  { icon: "/assets/skin.webp", size: 700, label: "Увлажнённая кожа" },
  { icon: "/assets/hair.webp", size: 700, label: "Густые волосы" },
  { icon: "/assets/nails.webp", size: 700, label: "Крепкие ногти" },
  { icon: "/assets/sustavy-Picsart-BackgroundRemover.webp", size: 1024, label: "Подвижные суставы" },
] as const;

export function Advantages(): React.JSX.Element {
  return (
    <section className="bg-paper border-y border-line">
      <div className="max-w-[1340px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <Reveal className="text-center mb-12 lg:mb-16">
          <p className="eyebrow text-[12px] text-smoke mb-6">Daily effect</p>
          <h2 className="display text-[44px] sm:text-[56px] lg:text-[68px] text-ink">Преимущества</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-12 max-w-[1200px] mx-auto">
          {ADVANTAGES.map((item) => (
            <Reveal key={item.label} className="flex flex-col items-center text-center">
              <Image
                src={item.icon}
                alt=""
                width={item.size}
                height={item.size}
                className="w-[120px] h-[120px] lg:w-[148px] lg:h-[148px] mb-8"
              />
              <p className="eyebrow text-[13px] lg:text-[15px] text-ink">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
