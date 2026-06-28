import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/server";
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

export default async function DeliveryPage(): Promise<React.JSX.Element> {
  const t = await getDictionary();
  const steps = [
    { n: "01", title: t.delivery.step1Title, body: t.delivery.step1Body },
    { n: "02", title: t.delivery.step2Title, body: t.delivery.step2Body },
    { n: "03", title: t.delivery.step3Title, body: t.delivery.step3Body },
    { n: "04", title: t.delivery.step4Title, body: t.delivery.step4Body },
  ];

  return (
    <>
      <PageHero
        title={t.delivery.title}
        image="/assets/hero-delivery.webp"
        imageMobile="/assets/hero-delivery-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Two steps per row so the section reads as a tidy 2×2 grid instead of
            a tall list with empty space on the right. */}
        <Reveal className="grid sm:grid-cols-2 gap-px bg-line border border-line">
          {steps.map((step) => (
            <div key={step.n} className="bg-cream p-8 lg:p-10">
              <p className="display text-[36px] sm:text-[44px] text-ink/20 leading-none mb-4">{step.n}</p>
              <h2 className="display text-[22px] sm:text-[26px] text-ink mb-3">{step.title}</h2>
              <p className="text-[15px] leading-[1.75] text-smoke">{step.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <a
            href={UZUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            {t.delivery.ctaUzum}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            {t.delivery.ctaInstagram}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            {t.delivery.ctaTelegram}
          </a>
        </Reveal>
      </div>
      </section>
    </>
  );
}
