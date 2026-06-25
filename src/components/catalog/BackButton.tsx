"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Returns the visitor to wherever they came from (home, catalog, search…) using
 * the browser history. Falls back to the catalog when the page was opened
 * directly (shared link, new tab), where there is no in-app history to pop.
 */
export function BackButton(): React.JSX.Element {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // If there is in-app history to pop, go back to the exact page the visitor
    // came from (home, catalog, search…); otherwise fall back to the catalog.
    setCanGoBack(window.history.length > 1);
  }, []);

  const className =
    "inline-flex items-center gap-2 eyebrow text-[10px] text-smoke hover:text-ink transition-colors mb-9";
  const content = (
    <>
      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
      Назад
    </>
  );

  if (canGoBack) {
    return (
      <button type="button" onClick={() => router.back()} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href="/catalog" className={className}>
      {content}
    </Link>
  );
}
