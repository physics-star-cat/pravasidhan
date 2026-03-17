import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "Privacy Policy",
  `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your information.`,
  "/privacy/"
);

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy/" }]} />

      <article className="prose max-w-none">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: March 2026
        </p>

        <section className="mb-8">
          <h2>Introduction</h2>
          <p>
            {SITE_NAME} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) operates the website at{" "}
            <a href={SITE_URL}>{SITE_URL}</a>. This Privacy Policy explains how
            we collect, use, and protect information when you visit our site.
          </p>
        </section>

        <section className="mb-8">
          <h2>Information We Collect</h2>
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our site, we may automatically collect certain
            information through analytics services, including:
          </p>
          <ul>
            <li>Pages viewed and time spent on pages</li>
            <li>Referring website or search terms</li>
            <li>Device type, browser, and operating system</li>
            <li>Approximate geographic location (country/region level)</li>
          </ul>
          <p>
            We use Vercel Analytics, which is privacy-focused and does not use
            cookies for tracking.
          </p>

          <h3>Information You Provide</h3>
          <p>
            If you contact us via email, we collect the information you
            voluntarily provide (name, email address, message content).
          </p>
        </section>

        <section className="mb-8">
          <h2>How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Understand which content is most useful to readers</li>
            <li>Improve site performance and user experience</li>
            <li>Respond to reader inquiries</li>
            <li>Monitor site health and security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Affiliate Links</h2>
          <p>
            Our site contains affiliate links to third-party financial services.
            When you click these links, the third-party service may collect
            information about you according to their own privacy policies. We
            recommend reviewing their policies before providing any personal
            information.
          </p>
          <p>
            We do not share your personal information with affiliate partners.
            Affiliate tracking is handled through URL parameters and cookies set
            by the third-party service, not by us.
          </p>
        </section>

        <section className="mb-8">
          <h2>Cookies</h2>
          <p>
            Our site uses minimal cookies. We do not use advertising cookies or
            third-party tracking cookies. Any cookies used are strictly necessary
            for site functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2>Third-Party Services</h2>
          <p>We may use the following third-party services:</p>
          <ul>
            <li>
              <strong>Vercel:</strong> Hosting and analytics
            </li>
            <li>
              <strong>Google Search Console:</strong> Search performance
              monitoring
            </li>
          </ul>
          <p>
            Each service has its own privacy policy governing how they handle
            data.
          </p>
        </section>

        <section className="mb-8">
          <h2>Data Retention</h2>
          <p>
            Analytics data is retained in aggregate form. Any personal
            information provided via email is retained only as long as necessary
            to respond to your inquiry and then deleted.
          </p>
        </section>

        <section className="mb-8">
          <h2>Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion
            of any personal information we hold about you. Contact us at{" "}
            <a href="mailto:hello@pravasidhan.com">hello@pravasidhan.com</a> to
            exercise these rights.
          </p>
        </section>

        <section className="mb-8">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:hello@pravasidhan.com">hello@pravasidhan.com</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
