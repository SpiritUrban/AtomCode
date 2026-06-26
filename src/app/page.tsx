import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";
import { buildSections } from "@/lib/loadContent";
import { getDefaultLessonPath } from "@/lib/routes";

export default function Home() {
  const sections = buildSections(defaultLocale);
  redirect(getDefaultLessonPath(sections, defaultLocale));
}