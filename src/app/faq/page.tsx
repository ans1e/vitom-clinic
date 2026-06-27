import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion, type FaqItem } from "@/components/shared/FaqAccordion";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Вопросы и ответы",
  description:
    "Частые вопросы о морском коллагене VITOM: форматы шотов и желе, способ приёма, курсы, доставка и где купить.",
  path: "/faq",
});

const FAQ: readonly FaqItem[] = [
  {
    question: "Чем шоты VITOSHOTS отличаются от желе?",
    answer:
      "Это два формата одного курса. VITOSHOTS — готовый жидкий приём без подготовки, удобно брать с собой. Желе — мягкий формат для домашнего ритуала. Состав и действие совпадают, отличается только способ приёма и текстура.",
  },
  {
    question: "Как принимать и сколько длится курс?",
    answer:
      "Один приём в день, лучше утром натощак или между приёмами пищи. Объём 700 мл и 650 г рассчитан примерно на месячный курс; варианты 1400 мл и 2100 мл — на более длинные курсы со скидкой за объём.",
  },
  {
    question: "Какие вкусы есть в линейке?",
    answer:
      "Три вкуса в обоих форматах: смородина, яблоко и вишня. Вкусы взаимозаменяемы по составу — выбирайте по предпочтению.",
  },
  {
    question: "Из чего сделан коллаген?",
    answer:
      "В основе морской коллаген — он отличается высокой биодоступностью. Состав чистый, без лишних добавок; полный список ингредиентов указан на упаковке каждого продукта.",
  },
  {
    question: "Как оформить заказ и получить доставку?",
    answer:
      "Заказы идут через Uzum Market — нажмите «Где купить» или иконку Uzum в подвале сайта. Доставка и оплата проходят на стороне маркетплейса по всему Узбекистану.",
  },
  {
    question: "Есть ли сертификаты качества?",
    answer:
      "Да. Продукция сопровождается сертификатами соответствия — раздел «Сертификаты» на главной странице. По дополнительным документам напишите нам в Telegram.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Вопросы и ответы"
        image="/assets/hero-faq.webp"
        imageMobile="/assets/hero-faq-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* Intro column — desktop only; on mobile the hero already carries the
              title, so we go straight to the questions. */}
          <div className="hidden lg:block lg:sticky lg:top-[calc(var(--header-h,79px)+2.5rem)]">
            <p className="text-[16px] leading-[1.8] text-smoke max-w-[420px]">
              Коротко о форматах, приёме и заказе VITOM. Не нашли ответ — напишите нам
              в Telegram, отвечаем в течение дня.
            </p>
            {/* Desktop: CTA lives in the sticky intro column. */}
            <div>
              <a
                href="https://t.me/vitom_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark text-[12px] mt-8 px-7 py-3.5 rounded-full"
              >
                Написать в Telegram
              </a>
            </div>
          </div>

          <div>
            <FaqAccordion items={FAQ} />

            {/* Mobile: CTA sits under the questions, where it reads as the next step. */}
            <div className="lg:hidden">
              <a
                href="https://t.me/vitom_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark w-full text-[12px] mt-10 px-7 py-4 rounded-full"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      </section>
    </>
  );
}
