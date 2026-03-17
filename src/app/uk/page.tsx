import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Guides for UK — Coming Soon",
  "Comprehensive guides on taxes, remittances, investments, and banking for Indians living in the United Kingdom. Coming soon.",
  "/uk/"
);

export default function UKHub() {
  return <ComingSoon country="the UK" flag="&#x1F1EC;&#x1F1E7;" />;
}
