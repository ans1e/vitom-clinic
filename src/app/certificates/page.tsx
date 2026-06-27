import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Сертификаты",
  description:
    "Качество и безопасность VITOM: сертификаты соответствия, чистый состав без сахара и искусственных добавок, легкоусвояемая форма морского коллагена.",
  path: "/certificates",
});

const TELEGRAM_URL = "https://t.me/vitom_uz";

const POINTS = [
  {
    title: "Сертификаты соответствия",
    body: "Продукция сопровождается документами о соответствии — подтверждают качество и безопасность каждого формата.",
  },
  {
    title: "Без сахара и подсластителей",
    body: "В составе нет добавленного сахара и искусственных подсластителей — чистая формула без лишнего.",
  },
  {
    title: "Без искусственных красителей",
    body: "Вкус и цвет — за счёт натуральных компонентов. Никаких синтетических красителей.",
  },
  {
    title: "Легкоусвояемый морской коллаген",
    body: "В основе — морской коллаген с высокой биодоступностью: форма, которую организм усваивает легче.",
  },
];

export default function CertificatesPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        title="Сертификаты"
        image="/assets/hero-certificates.webp"
        imageMobile="/assets/hero-certificates-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="max-w-[760px]">
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[620px]">
            VITOM — это прозрачный состав и подтверждённое качество. Полный список
            ингредиентов указан на упаковке каждого продукта, а документы мы готовы
            предоставить по запросу.
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-16 grid sm:grid-cols-2 gap-px bg-line border border-line">
          {POINTS.map((point) => (
            <div key={point.title} className="bg-cream p-8 lg:p-10">
              <h2 className="display text-[24px] sm:text-[26px] text-ink mb-3">{point.title}</h2>
              <p className="text-[15px] leading-[1.75] text-smoke">{point.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <p className="text-[15px] leading-[1.8] text-smoke max-w-[460px]">
            Нужны конкретные документы или копии сертификатов? Напишите нам — пришлём
            в ответ.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "dark", size: "lg" }), "rounded-full shrink-0")}
          >
            Запросить в Telegram
          </a>
        </Reveal>
      </div>
      </section>
    </>
  );
}
