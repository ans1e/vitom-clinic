"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AccountPopup } from "@/components/layout/AccountPopup";
import { MenuHoverLink } from "@/components/ui/menu-hover-effects";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  // Cart is persisted to localStorage; render the count only after mount to
  // avoid a server/client hydration mismatch.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Publish the live header height as --header-h so content can offset for the
  // fixed header at any breakpoint (the nav row wraps on some widths).
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = (): void =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 inset-x-0 z-50 bg-cream/85 backdrop-blur-md border-b border-line">
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
            <button
              type="button"
              aria-label="Корзина"
              onClick={() => setCartOpen(true)}
              className="relative hover:opacity-60 transition-opacity"
            >
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
              {hydrated && count > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Аккаунт"
              onClick={() => setAccountOpen(true)}
              className="hidden md:inline-flex hover:opacity-60 transition-opacity"
            >
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
        <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-7 pb-3 -mt-1 text-[14px]">
          {NAV.map((item) => (
            <MenuHoverLink key={item.label} href={item.href}>
              {item.label}
            </MenuHoverLink>
          ))}
        </nav>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} items={NAV} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AccountPopup open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
