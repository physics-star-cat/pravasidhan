import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Guides for USA — Coming Soon",
  "Comprehensive guides on taxes, remittances, investments, and banking for Indians living in the United States. Coming soon.",
  "/usa/"
);

export default function USAHub() {
  return <ComingSoon country="the USA" flag="&#x1F1FA;&#x1F1F8;" />;
}
