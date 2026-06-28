import type { Metadata } from "next";

import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Сертификаты",
  description:
    "Качество и безопасность VITOM: сертификаты соответствия, чистый состав без сахара и искусственных добавок, легкоусвояемая форма морского коллагена.",
  path: "/certificates",
});

const TELEGRAM_URL = "https://t.me/vitom_uz";

export default async function CertificatesPage(): Promise<React.JSX.Element> {
  const t = await getDictionary();
  const points = [
    { title: t.certificates.point1Title, body: t.certificates.point1Body },
    { title: t.certificates.point2Title, body: t.certificates.point2Body },
    { title: t.certificates.point3Title, body: t.certificates.point3Body },
    { title: t.certificates.point4Title, body: t.certificates.point4Body },
  ];

  return (
    <>
      <PageHero
        title={t.certificates.title}
        image="/assets/hero-certificates.webp"
        imageMobile="/assets/hero-certificates-m.webp"
        imageAlt="VITOM — натуральный морской коллаген"
      />

      <section className="bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <Reveal className="grid sm:grid-cols-2 gap-px bg-line border border-line">
          {points.map((point) => (
            <div key={point.title} className="bg-cream p-8 lg:p-10">
              <h2 className="display text-[24px] sm:text-[26px] text-ink mb-3">{point.title}</h2>
              <p className="text-[15px] leading-[1.75] text-smoke">{point.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <p className="text-[15px] leading-[1.8] text-smoke max-w-[460px]">
            {t.certificates.note}
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "dark", size: "lg" }), "rounded-full shrink-0")}
          >
            {t.certificates.cta}
          </a>
        </Reveal>
      </div>
      </section>
    </>
  );
}
