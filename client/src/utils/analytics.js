// Google tags (Ads AW-726250173 + Analytics G-3RYZDCMPBX) and Consent Mode v2
// defaults live in index.html. This module only flips consent on/off in response
// to the visitor's cookie-banner choice.

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent';
export const COOKIE_CONSENT_ACCEPTED = 'accepted';
export const COOKIE_CONSENT_DECLINED = 'declined';

// Consent categories the cookie banner toggles together (analytics + ads).
const CONSENT_KEYS = [
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'analytics_storage',
];

export const getCookieConsent = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const setCookieConsent = (value) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore unavailable storage.
  }
};

const updateConsent = (granted) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const value = granted ? 'granted' : 'denied';
  window.gtag(
    'consent',
    'update',
    Object.fromEntries(CONSENT_KEYS.map((key) => [key, value])),
  );
};

export const grantConsent = () => updateConsent(true);

export const denyConsent = () => updateConsent(false);

// On boot, mirror a previously stored choice. Consent Mode defaults to "denied"
// in index.html, so we only need to upgrade when the visitor already accepted.
export const applyStoredConsent = () => {
  if (getCookieConsent() === COOKIE_CONSENT_ACCEPTED) {
    grantConsent();
  }
};
