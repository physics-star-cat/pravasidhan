import { DISCLAIMER_TEXT } from "@/lib/constants";

interface DisclaimerProps {
  text?: string;
}

export default function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div className="border-l-4 border-warning bg-amber-50 rounded-r-lg p-5 my-8">
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 text-warning shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-900 mb-1">
            Disclaimer
          </p>
          <p className="text-sm text-amber-800 leading-relaxed">
            {text || DISCLAIMER_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}
