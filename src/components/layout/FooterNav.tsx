"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Single-row footer navigation. Каталог lives in the header, so it is omitted
// here. Links sit in one row (bonya-style) with a refined hover: a spring
// underline wipe plus a small lift — transform/opacity only.
const LINKS = [
  { label: "О нас", href: "/about" },
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
  { label: "Где купить", href: "/where-to-buy" },
  { label: "Сертификаты", href: "/certificates" },
] as const;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }): React.JSX.Element {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
    >
      <Link
        href={href}
        className="text-[15px] text-white/70 hover:text-white transition-colors duration-300"
      >
        {children}
      </Link>
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-0 h-px bg-white/80"
        initial={false}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.6 }}
      />
    </motion.span>
  );
}

export function FooterNav(): React.JSX.Element {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-14 gap-y-5">
      {LINKS.map((link) => (
        <FooterLink key={link.label} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </nav>
  );
}
