"use client";

import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/shared/Reveal";
import { HERO_BLUR } from "@/lib/hero-blur";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero(): React.JSX.Element {
  const { t } = useLocale();
  return (
    <section className="relative isolate overflow-hidden flex h-[calc(100svh_-_var(--header-h,79px))] min-h-[600px]">
      {/* Background — product photography (responsive: portrait on mobile) */}
      <Image
        src="/assets/heromobilefon.webp"
        alt="Продукты VITOM — морской коллаген и шоты VITOSHOTS"
        fill
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR["/assets/heromobilefon.webp"]}
        sizes="100vw"
        className="object-cover -z-10 md:hidden"
      />
      <Image
        src="/assets/herofon.webp"
        alt="Продукты VITOM — морской коллаген и шоты VITOSHOTS"
        fill
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR["/assets/herofon.webp"]}
        sizes="100vw"
        className="object-cover -z-10 hidden md:block"
      />
      {/* Legibility scrims: ground the buttons on mobile, lighten the text side on desktop */}
      <div className="absolute inset-0 -z-10 md:hidden bg-gradient-to-t from-cream/90 via-cream/15 to-transparent" />
      <div className="absolute inset-0 -z-10 hidden md:block bg-gradient-to-r from-cream/85 via-cream/35 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col justify-end md:justify-center pt-12 md:pt-0 pb-10 md:pb-16">
        <Reveal className="max-w-[620px] w-full">
          <h1 className="hidden md:block display text-[24px] sm:text-[28px] lg:text-[34px] leading-[1.25] text-ink mb-9">
            <span className="block">{t.hero.line1}</span>
            <span className="block">{t.hero.line2}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#catalog" className={cn(buttonVariants({ variant: "dark", size: "md" }))}>
              {t.hero.ctaPrimary}
            </a>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
