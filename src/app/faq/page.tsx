import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion, type FaqItem } from "@/components/shared/FaqAccordion";
import { getDictionary } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Вопросы и ответы",
  description:
    "Частые вопросы о морском коллагене VITOM: форматы шотов и желе, способ приёма, курсы, доставка и где купить.",
  path: "/faq",
});

export default async function FaqPage(): Promise<React.JSX.Element> {
  const t = await getDictionary();
  const faq: readonly FaqItem[] = t.faq.items.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <PageHero
        title={t.faq.title}
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
              {t.faq.intro}
            </p>
            {/* Desktop: CTA lives in the sticky intro column. */}
            <div>
              <a
                href="https://t.me/vitom_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark text-[12px] mt-8 px-7 py-3.5 rounded-full"
              >
                {t.faq.cta}
              </a>
            </div>
          </div>

          <div>
            <FaqAccordion items={faq} />

            {/* Mobile: CTA sits under the questions, where it reads as the next step. */}
            <div className="lg:hidden">
              <a
                href="https://t.me/vitom_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark w-full text-[12px] mt-10 px-7 py-4 rounded-full"
              >
                {t.faq.cta}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      </section>
    </>
  );
}
