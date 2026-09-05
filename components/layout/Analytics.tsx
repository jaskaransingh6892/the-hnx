import Script from "next/script";

import { site } from "@/lib/site";

/**
 * Google Tag Manager container. GA4 is configured inside the container rather
 * than with a second gtag.js snippet here — running both would count every
 * pageview twice. Loads with the `afterInteractive` strategy so it never
 * competes with the first paint. Set NEXT_PUBLIC_GTM_ID to point a preview or
 * staging deployment at a different container.
 */
export function Analytics() {
  return (
    <>
      {site.gtmId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`}
        </Script>
      ) : null}
    </>
  );
}

/**
 * GTM's fallback for visitors with JavaScript disabled. Google asks for this to
 * sit immediately after the opening <body> tag, so it is mounted separately
 * from the scripts above.
 */
export function AnalyticsNoScript() {
  if (!site.gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
