export interface AffiliatePartner {
  name: string;
  url: string;
  description: string;
  cta: string;
  category: "remittances" | "tax" | "investments" | "property" | "banking";
}

export const affiliates: Record<string, AffiliatePartner> = {
  wise: {
    name: "Wise",
    url: "https://wise.com/invite/YOURCODE",
    description:
      "Send money to India at the real mid-market exchange rate. Trusted by over 16 million people worldwide for fast, low-cost international transfers.",
    cta: "Try Wise — Save on Transfer Fees",
    category: "remittances",
  },
  cleartax: {
    name: "ClearTax",
    url: "https://cleartax.in/?ref=YOURCODE",
    description:
      "File your Indian income tax return online as an NRI. ClearTax makes ITR filing simple with expert CA assistance and automated form filling.",
    cta: "File Your NRI Taxes with ClearTax",
    category: "tax",
  },
  tax2win: {
    name: "Tax2Win",
    url: "https://tax2win.in/?ref=YOURCODE",
    description:
      "Expert-assisted NRI tax filing service. Get help with ITR filing, TDS refund claims, and tax planning from qualified chartered accountants.",
    cta: "File NRI Taxes with Tax2Win",
    category: "tax",
  },
  indmoney: {
    name: "INDmoney",
    url: "https://indmoney.com/?ref=YOURCODE",
    description:
      "Invest in Indian mutual funds, stocks, and fixed deposits from abroad. INDmoney offers a seamless NRI investment platform with portfolio tracking.",
    cta: "Start Investing with INDmoney",
    category: "investments",
  },
  sbnri: {
    name: "SBNRI",
    url: "https://sbnri.com/?ref=YOURCODE",
    description:
      "One-stop platform for NRI banking and investment needs. Open NRE/NRO accounts, invest in mutual funds, and manage your Indian finances remotely.",
    cta: "Explore SBNRI Services",
    category: "banking",
  },
  nobroker: {
    name: "NoBroker",
    url: "https://nobroker.in/?ref=YOURCODE",
    description:
      "Buy, sell, or rent property in India without brokerage fees. NoBroker connects you directly with property owners and provides end-to-end assistance for NRIs.",
    cta: "Find Property on NoBroker",
    category: "property",
  },
  squareyards: {
    name: "Square Yards",
    url: "https://squareyards.com/?ref=YOURCODE",
    description:
      "India's largest integrated platform for real estate. Get expert assistance buying property in India from abroad with dedicated NRI services.",
    cta: "Browse Properties on Square Yards",
    category: "property",
  },
} as const;

export function getAffiliate(key: string): AffiliatePartner | undefined {
  return affiliates[key];
}

export function getAffiliatesByCategory(
  category: AffiliatePartner["category"]
): Array<{ key: string } & AffiliatePartner> {
  return Object.entries(affiliates)
    .filter(([, partner]) => partner.category === category)
    .map(([key, partner]) => ({ key, ...partner }));
}
