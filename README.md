# PlantLogic AI

PlantLogic AI by Horticulture Specialists, LLC is a React Native Expo MVP for iOS and Android. It helps homeowners, gardeners, and plant lovers manage plant and bed profiles, estimate watering guidance, read practical guides, ask PlantLogic AI questions, request consultations, and use a simple local plant marketplace.

Website: https://hortspec.com

The mobile app is structured for a future DigitalOcean backend while the current MVP uses local mock data and placeholder API responses.

## Run The App

Open PowerShell in the project folder:

```powershell
cd "C:\Users\Maple Leaf Farms\Documents\PlantLogic Ai App"
```

Install and start:

```powershell
npm.cmd install
npx.cmd expo start
```

If your shell allows npm scripts directly, these also work:

```bash
npm install
npx expo start
```

## Checks

```powershell
npm.cmd run typecheck
npx.cmd expo export --platform web --output-dir dist-test
```

## Environment Variables

Copy `.env.example` to `.env` and replace the public placeholder values:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.plantlogic.example.com
EXPO_PUBLIC_APP_NAME=PlantLogic AI
EXPO_PUBLIC_SUPPORT_EMAIL=horticulturespecialists@gmail.com
EXPO_PUBLIC_WEBSITE_URL=https://hortspec.com
```

Only public mobile configuration belongs in Expo environment variables. Do not put OpenAI API keys, Stripe secret keys, database credentials, DigitalOcean Spaces secrets, or other private values in the mobile app.

## How Placeholders Work

When `EXPO_PUBLIC_API_BASE_URL` is missing or still points to the example URL, `src/services/api.ts` returns local fallback data. This keeps the app usable before the backend is built.

Current placeholder areas:

- Seller subscriptions simulate Stripe-ready plan actions.
- AI responses use local PlantLogic guidance until the secure backend is configured.
- Consultations are prepared locally through API-ready service calls.
- Messages are stored in local app state for the MVP.
- Watering reminders prepare calendar, notes, and email text but do not guarantee external delivery.
- Legal pages are production placeholders and need legal review before launch.

## Local Images

The app uses local, generated placeholder images under `assets/images`:

- `logo.png`
- `plant-placeholder.png`
- `bed-placeholder.png`
- `marketplace-placeholder.png`
- `profile-placeholder.png`
- `guide-placeholder.png`
- `seller-placeholder.png`

Real uploads are not implemented yet. Production image flow should be:

```text
App -> API -> DigitalOcean Spaces -> PostgreSQL Image URL
```

## DigitalOcean Backend Plan

Target architecture:

```text
Expo App
-> DigitalOcean Backend API
-> PostgreSQL Database
-> DigitalOcean Spaces For Images
-> Stripe For Seller Subscriptions
-> OpenAI API Through Backend Only
```

API-ready service files:

- `src/services/api.ts`
- `src/services/authApi.ts`
- `src/services/userApi.ts`
- `src/services/plantsApi.ts`
- `src/services/bedsApi.ts`
- `src/services/marketplaceApi.ts`
- `src/services/messagesApi.ts`
- `src/services/consultationApi.ts`
- `src/services/subscriptionApi.ts`
- `src/services/aiApi.ts`
- `src/services/uploadApi.ts`
- `src/services/remindersApi.ts`
- `src/services/legalApi.ts`

The backend should own authentication, PostgreSQL persistence, image upload signing, seller verification, marketplace safety tools, consultation notifications, Stripe billing, and OpenAI calls.

## Stripe Subscription Plan

Seller subscriptions should use Stripe Checkout or the Stripe Billing Portal from the secure backend. The app should only receive checkout URLs, subscription status, and plan limits.

Current seller tiers:

- Hobby Seller: $10/month, 10 listings
- Business Starter: $40/month, 20 listings
- Nursery Seller: $100/month, 30 listings, verified business badge after manual approval

The MVP does not collect real credit card data.

## AI Backend Plan

OpenAI should be called only through the backend. The backend should answer using PlantLogic watering rules, user state/region/zone, soil type, sun exposure, selected plant or bed, guides, saved resources, and approved online data only when helpful.

The AI should recommend human help when the issue is uncertain, risky, chemical-related, disease-related, tree-risk-related, pet or child safety-related, or expensive. Guidance is estimated and must be checked against real conditions.

## Watering Reminders

Watering reminders are estimated guidance, not exact guarantees. The app can prepare:

- Add To Google Calendar
- Add To Apple Calendar
- Save To Notes
- Email To Myself

PlantLogic prepares reminder text, but the reminder runs through the user’s chosen calendar, notes app, or email. Push notification reminders can be added later.

## Legal Placeholders

Profile includes placeholder pages for:

- Privacy Policy
- Terms Of Service
- Marketplace Rules
- Seller Rules
- Plant Care Disclaimer
- AI Guidance Disclaimer

These pages are plain-language MVP placeholders and should be reviewed before production release.

## MVP Boundaries

- No GPS tracking
- No ads
- No buyer/seller checkout
- No shipping, delivery, inventory tracking, or reviews
- No real payment processing inside the app
- No direct OpenAI secrets in the app
- No direct DigitalOcean or database secrets in the app

## Production Work Still Needed

- Build the DigitalOcean backend API
- Design and migrate the PostgreSQL schema
- Add real authentication and session handling
- Connect DigitalOcean Spaces signed uploads
- Add Stripe Checkout, Billing Portal, subscription syncing, and webhooks
- Add admin tools for seller verification and marketplace scam review
- Add real push notifications or backend reminder delivery
- Add real OpenAI backend orchestration and safety logging
- Add moderation/reporting workflows for marketplace messages and listings
- Have legal counsel review all legal/safety pages
- Test on iOS, Android, and web export before release
