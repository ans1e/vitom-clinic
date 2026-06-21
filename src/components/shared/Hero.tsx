import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FLOAT_IMAGES = [
  {
    src: "/assets/shots-blue.webp",
    alt: "Collagen Beauty Shots — смородина",
    w: 1800,
    h: 1755,
    cls: "left-0 top-6 w-[52%] drop-shadow-[0_30px_40px_rgba(60,80,100,0.18)]",
  },
  {
    src: "/assets/jelly-pink-big.webp",
    alt: "Натуральный морской коллаген",
    w: 1080,
    h: 1350,
    cls: "right-2 top-0 w-[40%] drop-shadow-[0_34px_44px_rgba(120,70,95,0.18)]",
  },
  {
    src: "/assets/jelly-blue-big.webp",
    alt: "Натуральный морской коллаген",
    w: 1080,
    h: 1350,
    cls: "left-[20%] bottom-0 w-[40%] drop-shadow-[0_34px_44px_rgba(60,90,110,0.2)]",
  },
  {
    src: "/assets/shots-green.webp",
    alt: "Collagen Beauty Shots — яблоко",
    w: 1440,
    h: 1800,
    cls: "right-0 bottom-6 w-[44%] drop-shadow-[0_30px_40px_rgba(70,100,75,0.18)]",
  },
] as const;

export function Hero(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden hero-grad">
      <span className="grain" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-[11px] text-smoke mb-6">Marine collagen · wellness</p>
            <h1 className="display text-[42px] sm:text-[56px] lg:text-[64px] text-ink mb-6">
              Морской коллаген для&nbsp;ежедневного ритуала
            </h1>
            <p className="text-[16px] leading-[1.7] text-smoke max-w-[440px] mb-9">
              Два формата приёма, чистый состав и понятные курсы. Откройте свежесть
              и эффективность в каждой порции VITOM.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/catalog" className={cn(buttonVariants({ variant: "dark", size: "md" }))}>
                К&nbsp;подбору
              </Link>
              <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
                О&nbsp;бренде
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="relative h-[360px] sm:h-[440px] lg:h-[500px]">
              {FLOAT_IMAGES.map((img) => (
                <Image
                  key={img.src + img.cls}
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  priority
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={cn("float-img absolute h-auto", img.cls)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
