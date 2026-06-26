"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

type LocaleSyncProps = {
  locale: Locale;
};

export default function LocaleSync({ locale }: LocaleSyncProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}