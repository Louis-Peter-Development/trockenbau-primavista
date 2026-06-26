// Google tag bootstrap (Ads AW-726250173 + Analytics G-3RYZDCMPBX) with
// Consent Mode v2. Loaded as an external script so it satisfies the site's
// Content-Security-Policy (script-src 'self'; see netlify.toml) without an
// inline-script hash. All ad/analytics storage defaults to "denied" until the
// visitor accepts cookies — the cookie banner upgrades consent via
// gtag('consent', 'update', ...) (see src/utils/analytics.js).
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
});

gtag('js', new Date());
gtag('config', 'AW-726250173');
gtag('config', 'G-3RYZDCMPBX', { anonymize_ip: true });
