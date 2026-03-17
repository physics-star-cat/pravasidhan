import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "About PravasiDhan",
  "Learn about PravasiDhan — who we are, our mission, and why we created the most trusted NRI finance resource online.",
  "/about/"
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "About", href: "/about/" }]} />

      <article className="prose max-w-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-8">
          About {SITE_NAME}
        </h1>

        <section className="mb-12">
          <h2>Our Mission</h2>
          <p>
            {SITE_NAME} exists to simplify NRI finance. Managing money across
            two countries is unnecessarily complicated — between tax treaties,
            repatriation rules, different banking systems, and constantly changing
            regulations, even financially savvy NRIs struggle to make informed
            decisions.
          </p>
          <p>
            We create thoroughly researched, regularly updated guides that help
            Non-Resident Indians navigate taxes, remittances, investments,
            property, and banking between India and their country of residence.
          </p>
        </section>

        <section className="mb-12">
          <h2>What We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
            {[
              {
                title: "Tax",
                desc: "NRI ITR filing, DTAA, TDS refunds, capital gains",
              },
              {
                title: "Remittances",
                desc: "Cheapest ways to send money to India",
              },
              {
                title: "Investments",
                desc: "Mutual funds, NRE FDs, stocks for NRIs",
              },
              {
                title: "Property",
                desc: "Buying, selling, and managing Indian property",
              },
              {
                title: "Banking",
                desc: "NRE/NRO accounts, repatriation, best banks",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-heading text-base font-bold text-navy mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2>Our Approach</h2>
          <p>
            Every article on {SITE_NAME} follows strict editorial principles:
          </p>
          <ul>
            <li>
              <strong>Accuracy first:</strong> We cite official sources — Income
              Tax Department circulars, FEMA regulations, RBI guidelines, and
              CRA/HMRC documentation.
            </li>
            <li>
              <strong>Regularly updated:</strong> Tax rules and rates change
              every year. We review and update all guides after each budget and
              regulatory change.
            </li>
            <li>
              <strong>Practical and actionable:</strong> Not just theory — we
              provide step-by-step instructions, comparison tables, and specific
              recommendations.
            </li>
            <li>
              <strong>Transparent about monetization:</strong> We earn affiliate
              commissions from some services we recommend. This is always
              disclosed. See our{" "}
              <Link href="/affiliate-disclosure/" className="gold-link">
                affiliate disclosure
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Who We Are</h2>
          <p>
            {SITE_NAME} is created by NRIs who have personally navigated the
            complexities of cross-border finance between India and abroad. We
            understand the frustrations — from figuring out which TDS rate applies
            to your NRO interest to choosing between Wise and a bank wire for
            sending money home.
          </p>
          <p>
            Our content is written in consultation with chartered accountants and
            tax professionals who specialize in NRI taxation. While we strive for
            accuracy, our content is educational and should not be taken as
            personalized financial or legal advice.
          </p>
        </section>

        <section className="mb-12">
          <h2>Contact</h2>
          <p>
            Have a question, correction, or content suggestion? We value
            accuracy and welcome feedback from our readers.
          </p>
          <p>
            Email us at{" "}
            <a href="mailto:hello@pravasidhan.com" className="gold-link">
              hello@pravasidhan.com
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
