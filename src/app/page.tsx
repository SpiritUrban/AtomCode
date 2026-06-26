import AppShell from "@/components/AppShell";
import { buildSections } from "@/lib/loadContent";

export default function Home() {
  const sections = buildSections();

  return <AppShell sections={sections} />;
}