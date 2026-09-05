import Script from "next/script";

import { site } from "@/lib/site";

/**
 * Google tag (gtag.js) for GA4. Loaded with the `afterInteractive` strategy so
 * it never competes with the first paint. Set NEXT_PUBLIC_GA_ID to point a
 * preview/staging deployment at a different property; leave it unset to use the
 * production measurement ID from `lib/site.ts`.
 */
export function Analytics() {
  if (!site.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
      </Script>
    </>
  );
}
