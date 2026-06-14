import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  COOKIE_CONSENT_ACCEPTED,
  COOKIE_CONSENT_DECLINED,
  getCookieConsent,
  initializeAnalytics,
  setCookieConsent,
} from '../../utils/analytics';
import './CookieBanner.scss';

function CookieBanner() {
  const [bannerState, setBannerState] = useState(() => {
    const cookieConsent = getCookieConsent();
    return {
      isVisible: !cookieConsent,
      hasChoice: !!cookieConsent,
      consent: cookieConsent,
    };
  });

  const isVisible = bannerState.isVisible;

  const handleAccept = () => {
    const previousConsent = bannerState.consent;
    setCookieConsent(COOKIE_CONSENT_ACCEPTED);
    setBannerState({ isVisible: false, hasChoice: true, consent: COOKIE_CONSENT_ACCEPTED });
    initializeAnalytics();

    if (previousConsent === COOKIE_CONSENT_DECLINED) {
      window.location.reload();
    }
  };

  const handleDecline = () => {
    const previousConsent = bannerState.consent;
    setCookieConsent(COOKIE_CONSENT_DECLINED);
    setBannerState({ isVisible: false, hasChoice: true, consent: COOKIE_CONSENT_DECLINED });

    if (previousConsent === COOKIE_CONSENT_ACCEPTED) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className={`cookie-banner${isVisible ? ' cookie-banner--visible' : ''}`}>
        <div className="cookie-banner__content">
          <div className="cookie-banner__text-wrap">
            <span className="cookie-banner__eyebrow">Cookies</span>
            <h3 className="cookie-banner__title">Wir verwenden Cookies</h3>
            <p className="cookie-banner__text">
              Diese Website verwendet notwendige Speicherfunktionen und optional
              Google Analytics, um die Nutzung der Website besser zu verstehen.
              Sie können der optionalen Analyse zustimmen oder sie ablehnen.
              Weitere Informationen finden Sie in unserer{' '}
              <Link to="/datenschutz" className="cookie-banner__link">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>

          <div className="cookie-banner__actions">
            <button
              type="button"
              className="cookie-banner__button cookie-banner__button--secondary"
              onClick={handleDecline}
            >
              Ablehnen
            </button>
            <button
              type="button"
              className="cookie-banner__button cookie-banner__button--primary"
              onClick={handleAccept}
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookieBanner;
