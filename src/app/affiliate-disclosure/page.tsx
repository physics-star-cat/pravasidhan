import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "Affiliate Disclosure",
  `Affiliate disclosure for ${SITE_NAME}. Transparency about how we earn revenue and how it affects our content.`,
  "/affiliate-disclosure/"
);

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" },
        ]}
      />

      <article className="prose max-w-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">
          Affiliate Disclosure
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: March 2026
        </p>

        <section className="mb-8">
          <h2>How We Earn Revenue</h2>
          <p>
            {SITE_NAME} is an independently operated website. To keep this site
            running and continue producing high-quality NRI finance guides, we
            participate in affiliate programs with select financial services and
            products.
          </p>
          <p>
            This means that some links on our site are &ldquo;affiliate
            links.&rdquo; When you click on these links and sign up for or
            purchase a service, we may receive a commission from the service
            provider at no additional cost to you.
          </p>
        </section>

        <section className="mb-8">
          <h2>Our Partners</h2>
          <p>
            We currently have affiliate relationships with services in the
            following categories:
          </p>
          <ul>
            <li>
              <strong>Money Transfer Services:</strong> Platforms that help NRIs
              send money to India at competitive rates
            </li>
            <li>
              <strong>Tax Filing Services:</strong> Online platforms and CA
              services that help NRIs file Indian income tax returns
            </li>
            <li>
              <strong>Investment Platforms:</strong> Services that enable NRIs to
              invest in Indian mutual funds, stocks, and fixed deposits
            </li>
            <li>
              <strong>Property Platforms:</strong> Real estate services that
              assist NRIs with buying or selling property in India
            </li>
            <li>
              <strong>Banking Services:</strong> Platforms that help NRIs open
              and manage NRE/NRO accounts
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Our Editorial Independence</h2>
          <p>
            Affiliate relationships do not influence our editorial content.
            Specifically:
          </p>
          <ul>
            <li>
              We only recommend services we have researched and believe provide
              genuine value to NRIs
            </li>
            <li>
              Our comparison articles include both affiliate and non-affiliate
              options, and we highlight the best choice regardless of affiliate
              status
            </li>
            <li>
              We clearly identify when a link is an affiliate link, either
              through context or through our dedicated affiliate redirect URLs
              (/go/ links)
            </li>
            <li>
              We do not accept payment for positive reviews or rankings
            </li>
            <li>
              If a service we recommend declines in quality, we update our
              content accordingly, even if it means losing affiliate revenue
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>How Affiliate Links Work</h2>
          <p>
            Affiliate links on our site are routed through our redirect system
            (URLs starting with /go/). When you click one of these links:
          </p>
          <ol>
            <li>
              You are redirected to the partner&apos;s website with our affiliate
              tracking code
            </li>
            <li>
              The partner may place a cookie on your browser to track the
              referral
            </li>
            <li>
              If you complete a qualifying action (sign up, make a transfer,
              etc.), we receive a commission
            </li>
            <li>
              You pay no extra — the commission comes from the partner&apos;s
              marketing budget
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2>Your Choice</h2>
          <p>
            You are never obligated to use our affiliate links. If you prefer,
            you can navigate directly to any service&apos;s website. Our content
            and recommendations remain equally valuable regardless of how you
            choose to access these services.
          </p>
        </section>

        <section className="mb-8">
          <h2>Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships or
            editorial process, please contact us at{" "}
            <a href="mailto:hello@pravasidhan.com">hello@pravasidhan.com</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
