import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "О бренде",
  description:
    "VITOM соединяет морской коллаген, чистую визуальную культуру и понятные курсы — премиальная wellness-линия для ежедневного ритуала.",
  path: "/about",
});

const STATS = [
  { value: "2", label: "Формата приёма" },
  { value: "3", label: "Объёма курса" },
  { value: "3", label: "Вкусовые палитры" },
];

export default function AboutPage(): React.JSX.Element {
  return (
    <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <Reveal className="max-w-[760px]">
          <p className="eyebrow text-[11px] text-smoke mb-6">About VITOM</p>
          <h1 className="display text-[44px] sm:text-[60px] text-ink mb-8">
            Премиальная wellness-линия<br className="hidden sm:block" /> для ежедневного ритуала
          </h1>
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[640px]">
            VITOM соединяет морской коллаген, чистую визуальную культуру и понятные
            курсы без перегрузки. Основная линейка строится вокруг двух форматов
            приёма: порционные beauty shots и желе. Отдельная страница бренда готова
            к наполнению историей, составом и принципами продукта.
          </p>
        </Reveal>

        <Reveal className="grid sm:grid-cols-3 gap-10 mt-16 border-t border-line pt-12">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="display text-[52px] text-ink mb-3">{stat.value}</p>
              <p className="eyebrow text-[11px] text-smoke">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
