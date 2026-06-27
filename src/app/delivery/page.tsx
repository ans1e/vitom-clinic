import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Доставка и оплата",
  description:
    "Как заказать VITOM: оформление через Uzum Market, оплата онлайн или при получении и доставка по всему Узбекистану.",
  path: "/delivery",
});

const UZUM_URL = "https://uzum.uz/shop/vitomclinic";
const TELEGRAM_URL = "https://t.me/vitom_uz";
const INSTAGRAM_URL = "https://www.instagram.com/vitom.clinic/";

const STEPS = [
  {
    n: "01",
    title: "Выбираете формат и объём",
    body: "Шоты VITOSHOTS или желе, в нужном вкусе и на нужный курс — от месяца до длинного курса со скидкой за объём.",
  },
  {
    n: "02",
    title: "Оформляете заказ на Uzum Market",
    body: "Переходите в наш магазин на Uzum, добавляете товар в корзину и подтверждаете заказ — каталог и наличие всегда актуальны.",
  },
  {
    n: "03",
    title: "Оплачиваете удобным способом",
    body: "Картой онлайн или при получении. Оплата проходит на стороне Uzum Market — безопасно и без предоплаты наличными нам.",
  },
  {
    n: "04",
    title: "Получаете доставку по Узбекистану",
    body: "Сроки, трекинг и пункты выдачи показывает маркетплейс. Доставка работает по всей стране.",
  },
];

export default function DeliveryPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        title="Доставка и оплата"
        image="/assets/hero-delivery.webp"
        imageMobile="/assets/hero-delivery-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="max-w-[760px]">
          <p className="text-[17px] leading-[1.8] text-smoke max-w-[620px]">
            Заказы VITOM проходят через Uzum Market — оплату и доставку берёт на себя
            маркетплейс. Ниже — как оформить заказ за четыре простых шага.
          </p>
        </Reveal>

        {/* Two steps per row so the section reads as a tidy 2×2 grid instead of
            a tall list with empty space on the right. */}
        <Reveal className="mt-14 lg:mt-16 grid sm:grid-cols-2 gap-px bg-line border border-line">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-cream p-8 lg:p-10">
              <p className="display text-[36px] sm:text-[44px] text-ink/20 leading-none mb-4">{step.n}</p>
              <h2 className="display text-[22px] sm:text-[26px] text-ink mb-3">{step.title}</h2>
              <p className="text-[15px] leading-[1.75] text-smoke">{step.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row flex-wrap gap-4">
          <a
            href={UZUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "dark", size: "lg" }), "rounded-full")}
          >
            Открыть на Uzum Market
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            Заказать в Instagram
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            Задать вопрос в Telegram
          </a>
        </Reveal>
      </div>
      </section>
    </>
  );
}
