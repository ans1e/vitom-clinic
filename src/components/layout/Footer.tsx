import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

const NAV = [
  { label: "О нас", href: "/about" },
  { label: "Каталог", href: "/catalog" },
  { label: "Доставка и оплата", href: "/#delivery" },
  { label: "Где купить", href: "/#retail" },
  { label: "Сертификаты", href: "/#trust" },
  { label: "Контакты", href: "/#contacts" },
] as const;

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    img: "/assets/instagram-logo-colored.jpg",
    wrap: "",
    img_cn: "object-cover",
  },
  {
    label: "Telegram",
    href: "#",
    img: "/assets/telegram-6896827_1280.png",
    wrap: "bg-[#29A9EB] flex items-center justify-center",
    img_cn: "object-cover scale-[1.18]",
  },
  {
    label: "Uzum Market",
    href: "#",
    img: "/assets/uzum_logo.png",
    wrap: "bg-[#FFE000] flex items-center justify-center",
    img_cn: "object-cover object-center scale-[1.18]",
  },
] as const;

export function Footer(): React.JSX.Element {
  return (
    <footer id="contacts" className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-10">
        <p className="wordmark footer-wordmark font-extrabold tracking-[-0.005em] text-[#F4F1EB] text-center mb-12 lg:mb-16">
          VITOM&nbsp;CLINIC
        </p>

        <div className="border-t border-white/12 pt-12 flex flex-col items-center gap-10">
          <nav className="flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-12 gap-y-4 text-[15px] text-white/80">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={cn(
                  "w-12 h-12 rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1",
                  social.wrap,
                )}
              >
                <Image
                  src={social.img}
                  alt={social.label}
                  width={48}
                  height={48}
                  className={cn("w-full h-full", social.img_cn)}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/12 mt-14 pt-7 flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p className="text-[14px] text-white/55 order-1">© 2026 VITOM CLINIC</p>
          <p className="text-[12px] text-white/35 order-3 sm:order-2">
            Сайт разработан командой{" "}
            <span className="font-montserrat font-semibold tracking-[0.1em] text-white/55">ALTA</span>
          </p>
          <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors order-2 sm:order-3">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
