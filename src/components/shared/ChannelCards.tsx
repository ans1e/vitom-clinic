"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send, Instagram, ShoppingBag, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Icons are keyed by name so the card list stays serializable when passed
 *  from a Server Component page into this Client Component. */
const ICONS: Record<string, LucideIcon> = {
  telegram: Send,
  instagram: Instagram,
  uzum: ShoppingBag,
};

export interface Channel {
  icon: keyof typeof ICONS | string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

function ChannelCard({ channel }: { channel: Channel }): React.JSX.Element {
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[channel.icon] ?? Send;

  return (
    <motion.a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 26, mass: 0.6 }}
      className="group relative flex flex-col gap-7 border border-line bg-paper/40 p-7 transition-colors duration-300 hover:bg-paper/80"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="text-smoke transition-colors group-hover:text-ink"
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
        </motion.span>
      </div>

      <div>
        <p className="eyebrow text-[10px] text-smoke mb-2.5">{channel.eyebrow}</p>
        <h3 className="display text-[24px] text-ink mb-2">{channel.title}</h3>
        <p className="text-[14px] leading-[1.7] text-smoke">{channel.description}</p>
      </div>
    </motion.a>
  );
}

export function ChannelCards({
  channels,
  className,
}: {
  channels: Channel[];
  className?: string;
}): React.JSX.Element {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {channels.map((channel) => (
        <ChannelCard key={channel.title} channel={channel} />
      ))}
    </div>
  );
}
