"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AccountPopup } from "@/components/layout/AccountPopup";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MenuHoverLink } from "@/components/ui/menu-hover-effects";

export function Header(): React.JSX.Element {
  const { t } = useLocale();
  const NAV = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.catalog, href: "/catalog" },
    { label: t.nav.delivery, href: "/delivery" },
    { label: t.nav.whereToBuy, href: "/where-to-buy" },
    { label: t.nav.certificates, href: "/certificates" },
    { label: t.nav.contacts, href: "/contacts" },
  ];
  // The burger menu adds FAQ, which the desktop top nav leaves to the footer.
  const MOBILE_NAV = [...NAV, { label: t.nav.faq, href: "/faq" }];
  const count = useCartStore((state) => state.items.reduce((n, i) => n + i.quantity, 0));
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
        <div className="relative flex items-center justify-between lg:justify-center h-[78px]">
          <Link
            href="/"
            className="wordmark text-[19px] sm:text-[26px] lg:text-[34px] text-ink select-none"
          >
            VITOM&nbsp;CLINIC
          </Link>
          <div className="flex items-center gap-4 sm:gap-5 text-ink lg:absolute lg:right-0">
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <button
              type="button"
              aria-label={t.header.search}
              onClick={() => setSearchOpen(true)}
              className="hover:opacity-60 transition-opacity"
            >
              <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={t.header.cart}
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
              aria-label={t.header.account}
              onClick={() => setAccountOpen(true)}
              className="hidden lg:inline-flex hover:opacity-60 transition-opacity"
            >
              <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={t.header.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="lg:hidden hover:opacity-60 transition-opacity"
            >
              <Menu className="w-[24px] h-[24px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <nav className="hidden lg:flex items-center justify-center gap-5 lg:gap-7 pb-3 -mt-1 text-[14px]">
          {NAV.map((item) => (
            <MenuHoverLink key={item.label} href={item.href}>
              {item.label}
            </MenuHoverLink>
          ))}
        </nav>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} items={MOBILE_NAV} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AccountPopup open={accountOpen} onClose={() => setAccountOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
