export const SITE_NAME = "PravasiDhan";
export const SITE_URL = "https://pravasidhan.com";
export const SITE_DESCRIPTION =
  "Your trusted guide to NRI finance — taxes, remittances, investments, property, and banking for Indians abroad.";
export const SITE_TAGLINE = "Your Trusted Guide to NRI Finance";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  comingSoon?: boolean;
}

export const NAV_COUNTRIES: NavItem[] = [
  { label: "Canada", href: "/canada/" },
  { label: "USA", href: "/usa/", comingSoon: true },
  { label: "UK", href: "/uk/", comingSoon: true },
];

export const NAV_TOPICS: NavItem[] = [
  { label: "Tax", href: "/tax/" },
  { label: "Remittances", href: "/remittances/" },
  { label: "Investments", href: "/investments/" },
  { label: "Property", href: "/property/" },
  { label: "Banking", href: "/banking/" },
];

export const NAV_CONTENT: NavItem[] = [
  { label: "Guides", href: "/guides/" },
  { label: "Blog", href: "/blog/" },
  { label: "News from Home", href: "/news/" },
];

export const NAV_ITEMS: NavItem[] = [
  ...NAV_COUNTRIES,
  {
    label: "Topics",
    href: "#",
    children: NAV_TOPICS,
  },
  { label: "Blog", href: "/blog/" },
  { label: "News", href: "/news/" },
  { label: "About", href: "/about/" },
];

export interface Country {
  slug: string;
  name: string;
  flag: string;
  active: boolean;
}

export const COUNTRIES: Country[] = [
  { slug: "canada", name: "Canada", flag: "🇨🇦", active: true },
  { slug: "usa", name: "USA", flag: "🇺🇸", active: false },
  { slug: "uk", name: "UK", flag: "🇬🇧", active: false },
];

export interface Topic {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export const TOPICS: Topic[] = [
  {
    slug: "tax",
    name: "Tax",
    icon: "receipt",
    description:
      "NRI tax filing, DTAA benefits, TDS refunds, and cross-border tax planning between India and your country of residence.",
  },
  {
    slug: "remittances",
    name: "Remittances",
    icon: "banknotes",
    description:
      "Compare the cheapest and fastest ways to send money to India. Wise, bank wires, and other transfer services compared.",
  },
  {
    slug: "investments",
    name: "Investments",
    icon: "chart",
    description:
      "Invest in Indian mutual funds, stocks, NRE fixed deposits, and other instruments as an NRI. Know your options and rules.",
  },
  {
    slug: "property",
    name: "Property",
    icon: "home",
    description:
      "Buying, selling, and managing property in India from abroad. Legal requirements, taxes, and financing for NRIs.",
  },
  {
    slug: "banking",
    name: "Banking",
    icon: "bank",
    description:
      "NRE vs NRO accounts, best NRI bank accounts, repatriation rules, and managing your Indian banking from overseas.",
  },
];

export const FOOTER_LINKS = {
  content: [
    { label: "All Guides", href: "/guides/" },
    { label: "Blog", href: "/blog/" },
    { label: "News from Home", href: "/news/" },
  ],
  about: [
    { label: "About PravasiDhan", href: "/about/" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
  ],
  topics: NAV_TOPICS.map((t) => ({ label: t.label, href: t.href })),
  countries: NAV_COUNTRIES.map((c) => ({
    label: c.label,
    href: c.href,
    comingSoon: c.comingSoon,
  })),
  legal: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Disclaimer", href: "/disclaimer/" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
  ],
};

export const DISCLAIMER_TEXT =
  "PravasiDhan provides educational content about NRI finance. We are not licensed financial advisors. Content on this site should not be construed as financial, tax, or legal advice. Always consult qualified professionals before making financial decisions. Some links on this site are affiliate links — we may earn a commission at no extra cost to you.";
