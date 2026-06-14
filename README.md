# Trockenbau Prima Vista

Marketing website for **Trockenbau Prima Vista**, built with React, Vite, Sass, and Netlify Functions.

The site includes a homepage, an interactive calculator, project reference pages, Google reviews, contact/request forms, cookie consent, and an OpenAI-backed chatbot.

## Stack

- React 19
- React Router
- Vite 8
- Sass
- Lucide React
- Netlify Functions
- Resend email delivery
- OpenAI API
- Google Places reviews

## Routes

- `/` - homepage
- `/kalkulator` - interactive Trockenbau calculator
- `/anfrage` - guided inquiry flow
- `/referenzen/:slug` - project detail pages
- `/impressum` - legal notice
- `/datenschutz` - privacy policy

## Project Structure

```text
.
├── client/
│   ├── public/
│   │   ├── videos/
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── sw.js
│   ├── scripts/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── netlify/
│   └── functions/
│       ├── _shared/
│       ├── chat.mjs
│       ├── forms-submit.mjs
│       ├── health.mjs
│       └── reviews.mjs
├── netlify.toml
├── package.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the full local site with Netlify Functions:

```bash
npm run dev
```

Netlify Dev serves the site at `http://localhost:8888` and runs Vite behind it on `http://localhost:5178`. Use the Netlify Dev URL when testing `/api/*` routes locally.

For frontend-only work, you can run Vite directly:

```bash
npm run dev:vite
```

## Scripts

```bash
npm run dev       # Netlify Dev with functions
npm run dev:vite  # Vite only
npm run build     # Production frontend build
npm run lint      # ESLint
npm test          # Netlify shared tests + client tests
npm run audit     # Production dependency audit for root and client
```

## Environment Variables

Create a local `.env` from `.env.example`. In Netlify, add the same variables under Site settings -> Environment variables.

```bash
# Email
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM="Trockenbau Prima Vista <info@trockenbau-primavista.ch>"
EMAIL_REPLY_TO=info@trockenbau-primavista.ch
EMAIL_NOTIFICATION_TO=info@trockenbau-primavista.ch
EMAIL_NOTIFICATION_BCC=
EMAIL_CONFIRMATIONS_ENABLED=true

# Chatbot
OPENAI_API_KEY=sk-your-openai-key

# Google reviews
GOOGLE_PLACE_ID=your-google-place-id
GOOGLE_PLACES_API_KEY=your-google-places-api-key
```

Form submissions fail if the internal notification cannot be delivered. This prevents website leads from being silently dropped.

## Netlify Functions

Available API routes:

- `POST /api/chat`
- `GET /api/reviews`
- `POST /api/forms/submit`
- `GET /api/health`

Shared function logic lives in `netlify/functions/_shared`.

## Forms

Three frontend forms submit JSON to `/api/forms/submit`:

- `contact`
- `calculator`
- `anfrage`

The function validates required fields, applies length limits, skips honeypot spam, sends an internal Resend notification, and optionally sends customer confirmations when `EMAIL_CONFIRMATIONS_ENABLED=true`.

## Calculator

The calculator supports:

- `Decken abhängen`
- `Wände stellen`
- `Estrich-Boden`
- `Dachschrägen`
- `Sonstiges`

Pricing logic lives in `client/src/components/Calculator/utils/pricing.js`, and catalog data lives in `client/src/components/Calculator/data/calculatorCatalog.js`.

## Assets

- Responsive image manifests live in `client/src/assets/responsiveImages.js`.
- Video references live in `client/src/assets/videoManifest.js`.
- Public videos live under `client/public/videos`.
- Responsive variants can be regenerated with:

```bash
npm --prefix client run images:generate
```

## Quality Checks

Before shipping changes, run:

```bash
npm run audit
npm test
npm run lint
npm run build
```
