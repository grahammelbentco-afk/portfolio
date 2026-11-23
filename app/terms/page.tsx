import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/content/homepage";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms/" } };

export default function Page() {
  return <LegalPage doc={legal.terms} />;
}
