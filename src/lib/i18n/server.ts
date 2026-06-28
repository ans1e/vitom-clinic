import { cookies } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

/** Current locale from the cookie (defaults to Russian). Server-only. */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Dictionary for the current request locale. Server-only. */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}
