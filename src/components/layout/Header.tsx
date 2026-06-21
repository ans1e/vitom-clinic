"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { MobileNav } from "@/components/layout/MobileNav";

const NAV = [
  { label: "О бренде", href: "/about" },
  { label: "Каталог", href: "/catalog" },
  { label: "Доставка и оплата", href: "/#delivery" },
  { label: "Где купить", href: "/#retail" },
  { label: "Сертификаты", href: "/#trust" },
  { label: "Контакты", href: "/#contacts" },
] as const;

export function Header(): React.JSX.Element {
  const count = useCartStore((state) => state.items.reduce((n, i) => n + i.quantity, 0));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="relative flex items-center justify-between md:justify-center h-[78px]">
          <Link
            href="/"
            className="wordmark text-[19px] sm:text-[26px] lg:text-[34px] text-ink select-none"
          >
            VITOM&nbsp;CLINIC
          </Link>
          <div className="flex items-center gap-4 sm:gap-5 text-ink md:absolute md:right-0">
            <button type="button" aria-label="Поиск" className="hidden md:inline-flex hover:opacity-60 transition-opacity">
              <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <Link href="/catalog" aria-label="Корзина" className="relative hover:opacity-60 transition-opacity">
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-ink text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count}
              </span>
            </Link>
            <button type="button" aria-label="Аккаунт" className="hidden md:inline-flex hover:opacity-60 transition-opacity">
              <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden hover:opacity-60 transition-opacity"
            >
              <Menu className="w-[24px] h-[24px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <nav className="hidden md:flex items-center justify-center gap-9 lg:gap-12 pb-4 -mt-1 text-[14px] text-smoke">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} className="navlink">
              {item.label}
            </Link>
          ))}
        </nav>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} items={NAV} />
    </>
  );
}
