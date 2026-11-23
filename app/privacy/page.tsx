import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/content/homepage";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy/" } };

export default function Page() {
  return <LegalPage doc={legal.privacy} />;
}
