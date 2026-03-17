import { type ReactNode } from "react";

interface AffiliateLinkProps {
  partner: string;
  children: ReactNode;
}

export default function AffiliateLink({ partner, children }: AffiliateLinkProps) {
  return (
    <a
      href={`/go/${partner}/`}
      rel="nofollow sponsored"
      target="_blank"
      className="text-gold-dark font-semibold underline decoration-gold underline-offset-2 hover:text-gold transition-colors"
    >
      {children}
    </a>
  );
}
