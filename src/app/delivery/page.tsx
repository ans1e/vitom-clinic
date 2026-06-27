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
        eyebrow="Delivery & payment"
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

        <Reveal className="mt-14 lg:mt-16 border-t border-line">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[120px_1fr] gap-x-6 sm:gap-x-12 gap-y-3 border-b border-line py-9 lg:py-11"
            >
              <p className="display text-[28px] sm:text-[40px] text-ink/25 leading-none">{step.n}</p>
              <div className="max-w-[560px]">
                <h2 className="display text-[24px] sm:text-[30px] text-ink mb-3">{step.title}</h2>
                <p className="text-[15px] leading-[1.75] text-smoke">{step.body}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row gap-4">
          <a
            href={UZUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "dark", size: "lg" }), "rounded-full")}
          >
            Открыть на Uzum Market
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
