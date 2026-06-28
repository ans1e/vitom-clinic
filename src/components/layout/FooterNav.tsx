"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLocale } from "@/components/i18n/LocaleProvider";

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
  const { t } = useLocale();
  const links = [
    { label: t.footer.about, href: "/about" },
    { label: t.footer.delivery, href: "/delivery" },
    { label: t.footer.faq, href: "/faq" },
    { label: t.footer.contacts, href: "/contacts" },
    { label: t.footer.whereToBuy, href: "/where-to-buy" },
    { label: t.footer.certificates, href: "/certificates" },
  ];
  return (
    <nav className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-14 gap-y-5">
      {links.map((link) => (
        <FooterLink key={link.href} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </nav>
  );
}
