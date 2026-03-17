import { getAffiliate } from "@/lib/affiliates";

interface AffiliateCTAProps {
  partner: string;
}

export default function AffiliateCTA({ partner }: AffiliateCTAProps) {
  const affiliate = getAffiliate(partner);

  if (!affiliate) {
    return null;
  }

  return (
    <div className="bg-navy rounded-xl p-6 sm:p-8 my-8 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Logo placeholder */}
        <div className="shrink-0 w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-heading font-bold text-gold">
            {affiliate.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-heading font-bold text-white mb-1">
            {affiliate.name}
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {affiliate.description}
          </p>
        </div>

        <div className="shrink-0">
          <a
            href={`/go/${partner}/`}
            rel="nofollow sponsored"
            target="_blank"
            className="inline-block px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition-colors text-sm shadow-md hover:shadow-lg"
          >
            {affiliate.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
