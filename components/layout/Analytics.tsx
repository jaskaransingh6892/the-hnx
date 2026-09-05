import Script from "next/script";

import { site } from "@/lib/site";

/**
 * Google Tag Manager container plus a direct gtag.js for GA4.
 *
 * TEMPORARY: GA4 is meant to run from inside the GTM container, but the live
 * container is publishing with an empty tag list, so nothing was being
 * collected. This snippet is here only to keep data flowing until that is
 * fixed.
 *
 * Safe only while the container has no GA4 tag. The moment one is published
 * there, remove this block — otherwise every pageview is counted twice, and
 * GA4 history cannot be corrected afterwards.
 *
 * Both load with the `afterInteractive` strategy so they never compete with
 * the first paint. Set NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_GA_ID to point a
 * preview or staging deployment at different containers.
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

      {site.gaId ? (
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
