import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero(): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden flex min-h-[600px] lg:min-h-[660px]">
      {/* Background — product photography (responsive: portrait on mobile) */}
      <Image
        src="/assets/heromobilefon.webp"
        alt="Продукты VITOM — морской коллаген и шоты VITOSHOTS"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 md:hidden"
      />
      <Image
        src="/assets/herofon.webp"
        alt="Продукты VITOM — морской коллаген и шоты VITOSHOTS"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 hidden md:block"
      />
      {/* Legibility scrims: top-down on mobile, left-to-right on desktop */}
      <div className="absolute inset-0 -z-10 md:hidden bg-gradient-to-b from-cream via-cream/60 to-transparent" />
      <div className="absolute inset-0 -z-10 hidden md:block bg-gradient-to-r from-cream/85 via-cream/35 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col justify-start md:justify-center pt-12 md:pt-0 pb-16">
        <Reveal className="max-w-[460px]">
          <p className="eyebrow text-[11px] text-smoke mb-6">Marine collagen · wellness</p>
          <h1 className="display text-[42px] sm:text-[56px] lg:text-[64px] text-ink mb-6">
            Морской коллаген для&nbsp;ежедневного ритуала
          </h1>
          <p className="text-[16px] leading-[1.7] text-ink/75 max-w-[420px] mb-9">
            Два формата приёма, чистый состав и понятные курсы. Откройте свежесть
            и эффективность в каждой порции VITOM.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#catalog" className={cn(buttonVariants({ variant: "dark", size: "md" }))}>
              К&nbsp;подбору
            </a>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
              О&nbsp;бренде
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
