import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "Financial Disclaimer",
  `Financial disclaimer for ${SITE_NAME}. Important information about the limitations of our content.`,
  "/disclaimer/"
);

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Disclaimer", href: "/disclaimer/" }]} />

      <article className="prose max-w-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">
          Financial Disclaimer
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: March 2026
        </p>

        <section className="mb-8">
          <h2>General Disclaimer</h2>
          <p>
            The information provided on {SITE_NAME} (the &ldquo;Site&rdquo;) is
            for general educational and informational purposes only. It is not
            intended to be, and should not be construed as, financial, tax,
            legal, or investment advice.
          </p>
        </section>

        <section className="mb-8">
          <h2>Not Financial Advice</h2>
          <p>
            {SITE_NAME} is not a licensed financial advisor, tax consultant,
            chartered accountant, or legal professional. The content on this site
            does not constitute personalized financial advice. Your financial
            situation is unique, and the information presented may not be
            applicable to your specific circumstances.
          </p>
          <p>
            <strong>
              Always consult with qualified professionals before making financial
              decisions.
            </strong>{" "}
            This includes but is not limited to:
          </p>
          <ul>
            <li>A chartered accountant (CA) for tax-related decisions</li>
            <li>A SEBI-registered investment advisor for investment decisions</li>
            <li>A qualified lawyer for legal matters related to property or regulations</li>
            <li>A licensed financial planner for comprehensive financial planning</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Accuracy of Information</h2>
          <p>
            While we make every effort to ensure the accuracy and timeliness of
            the information presented, tax laws, regulations, exchange rates, and
            financial product terms change frequently. We cannot guarantee that
            all information is current, complete, or error-free at the time you
            read it.
          </p>
          <p>
            We encourage readers to verify critical information with official
            sources such as the Income Tax Department of India, RBI, FEMA
            guidelines, and relevant government agencies in your country of
            residence.
          </p>
        </section>

        <section className="mb-8">
          <h2>No Liability</h2>
          <p>
            {SITE_NAME}, its authors, and contributors shall not be held liable
            for any losses, damages, or negative consequences arising from the
            use of information presented on this site. This includes, but is not
            limited to, financial losses, tax penalties, or legal consequences.
          </p>
        </section>

        <section className="mb-8">
          <h2>Third-Party Links</h2>
          <p>
            This site may contain links to third-party websites, products, and
            services. We are not responsible for the content, accuracy, or
            practices of these external sites. Inclusion of any link does not
            imply endorsement.
          </p>
        </section>

        <section className="mb-8">
          <h2>Affiliate Relationships</h2>
          <p>
            Some links on this site are affiliate links. We may earn a commission
            if you make a purchase or sign up through these links, at no
            additional cost to you. This does not influence our editorial content
            or recommendations. See our{" "}
            <a href="/affiliate-disclosure/">affiliate disclosure</a> for full
            details.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact</h2>
          <p>
            If you believe any information on this site is inaccurate or
            outdated, please contact us at{" "}
            <a href="mailto:hello@pravasidhan.com">hello@pravasidhan.com</a> so
            we can review and correct it.
          </p>
        </section>
      </article>
    </div>
  );
}
