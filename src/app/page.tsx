import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { SITE_TAGLINE, COUNTRIES, TOPICS } from "@/lib/constants";
import type { ArticleMeta } from "@/lib/articles";

// Placeholder featured articles until real content is published
const placeholderArticles: ArticleMeta[] = [
  {
    title: "How to Send Money from Canada to India in 2026: Cheapest Methods Compared",
    slug: "send-money-canada-to-india",
    description:
      "Compare Wise, bank wires, and other services to find the cheapest way to transfer money from Canada to India. Updated rates and fees.",
    publishedAt: "2026-03-20",
    countries: ["canada"],
    topics: ["remittances"],
    affiliates: ["wise"],
    keywords: ["send money canada to india"],
    featured: true,
    readingTime: "12 min read",
    readingTimeMinutes: 12,
  },
  {
    title: "Best NRI Tax Filing Services 2026: ClearTax vs Tax2Win vs Hiring a CA",
    slug: "nri-tax-filing-services",
    description:
      "Compare the top NRI tax filing services in India. We review ClearTax, Tax2Win, and CA-assisted filing to help you choose the right option.",
    publishedAt: "2026-03-22",
    countries: ["canada"],
    topics: ["tax"],
    affiliates: ["cleartax", "tax2win"],
    keywords: ["NRI tax filing service"],
    featured: true,
    readingTime: "10 min read",
    readingTimeMinutes: 10,
  },
  {
    title: "NRE vs NRO Account for Canadian NRIs: Which Should You Open?",
    slug: "nre-vs-nro-account-canada",
    description:
      "Understand the key differences between NRE and NRO accounts, tax implications, and which account type Canadian NRIs should open first.",
    publishedAt: "2026-03-25",
    countries: ["canada"],
    topics: ["banking"],
    affiliates: ["sbnri"],
    keywords: ["NRE vs NRO account"],
    featured: true,
    readingTime: "8 min read",
    readingTimeMinutes: 8,
  },
  {
    title: "Buying Property in India from Canada: Complete Legal & Tax Guide 2026",
    slug: "buying-property-india-canada",
    description:
      "Everything Canadian NRIs need to know about buying property in India — legal requirements, tax implications, financing options, and step-by-step process.",
    publishedAt: "2026-03-28",
    countries: ["canada"],
    topics: ["property"],
    affiliates: ["nobroker", "squareyards"],
    keywords: ["NRI buying property India"],
    featured: true,
    readingTime: "15 min read",
    readingTimeMinutes: 15,
  },
];

const topicIcons: Record<string, React.ReactNode> = {
  receipt: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
  banknotes: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  home: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  bank: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {SITE_TAGLINE}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Expert guides on taxes, remittances, investments, property, and
              banking for Non-Resident Indians. Start with Canada, expanding to
              USA and UK.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/remittances/"
                className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Send Money to India
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/tax/"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
              >
                NRI Tax Guides
              </Link>
              <Link
                href="/canada/"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
              >
                Canada Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              Featured Guides
            </h2>
            <p className="text-text-muted mt-2">
              In-depth, practical guides for managing your finances as an NRI
            </p>
          </div>
          <Link
            href="/canada/"
            className="hidden sm:inline-flex items-center text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
          >
            View all
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placeholderArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Country Selector */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
              Choose Your Country
            </h2>
            <p className="text-text-muted mt-2">
              Select where you live for tailored NRI finance guides
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}/`}
                className={`group relative block p-8 rounded-xl text-center border-2 transition-all duration-200 ${
                  country.active
                    ? "border-gold bg-gold-light/30 shadow-md hover:shadow-lg hover:border-gold-dark"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="font-heading text-lg font-bold text-navy">
                  {country.name}
                </h3>
                {country.active ? (
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-gold-dark bg-gold-light rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-text-muted bg-gray-100 rounded-full">
                    Coming Soon
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy">
            Explore by Topic
          </h2>
          <p className="text-text-muted mt-2">
            Comprehensive coverage of every aspect of NRI finance
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${topic.slug}/`}
              className="group block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold/50 transition-all duration-200"
            >
              <div className="text-gold mb-4 group-hover:text-gold-dark transition-colors">
                {topicIcons[topic.icon]}
              </div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-gold-dark transition-colors">
                {topic.name}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-navy-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Why Trust PravasiDhan?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Thoroughly Researched",
                description:
                  "Every guide is based on official sources, current regulations, and real NRI experiences.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Regularly Updated",
                description:
                  "Tax laws and regulations change. We keep our guides current with the latest rules and rates.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
              {
                title: "Practical Advice",
                description:
                  "Step-by-step guides, comparison tables, and actionable recommendations you can follow.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Transparent",
                description:
                  "We clearly disclose affiliate relationships. Our recommendations are honest, always.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/20 text-gold rounded-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
