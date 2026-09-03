# WV-182 review follow-up evidence

Measured on 3 September 2026 against the local Astro production preview after a clean production build.

## Simulated mid-tier mobile LCP

Lighthouse 12.8.2 ran once for each of the eight routes in mobile form factor with simulated throttling. The profile used a 360 × 800 viewport at 2× device scale, 150 ms RTT, 1,638.4 Kbit/s throughput, and 4× CPU slowdown. This is Lighthouse's simulated mobile profile and represents the requested mid-tier phone test. The machine-readable results and full profile are in [`lighthouse-mobile.json`](./lighthouse-mobile.json).

| Route | LCP | Result |
| --- | ---: | --- |
| `/` | 0.904 s | Pass |
| `/producten/hefbruggen/` | 0.904 s | Pass |
| `/producten/kantelaars/` | 0.752 s | Pass |
| `/producten/werkplaatsliften/` | 0.902 s | Pass |
| `/over-ons/` | 0.902 s | Pass |
| `/dealer-worden/` | 0.903 s | Pass |
| `/contact/` | 0.903 s | Pass |
| `/dealerzoeker/` | 0.903 s | Pass |

All measured LCP values are below the 2.5-second acceptance threshold. These local, simulated values do not substitute for field data or a measurement of a hosted preview.

Reproduction command (replace `<route>` with each route in the table):

```sh
CHROME_PATH=/path/to/chromium npx --yes lighthouse@12.8.2 \
  "http://127.0.0.1:4321/kantelbeer-site/<route>" \
  --only-categories=performance --output=json \
  --form-factor=mobile --throttling-method=simulate \
  --screenEmulation.mobile=true --screenEmulation.width=360 \
  --screenEmulation.height=800 --screenEmulation.deviceScaleFactor=2 \
  --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' --quiet
```

## Contrast correction for the PR description

The previous PR-description range of **5.49:1 to 10.64:1** is stale. After the review fix, the product-hero eyebrow uses ink on sand at **12.58:1**. The verified text combinations therefore range from **5.49:1 to 16.36:1**, including ink on white in the specification and model cards. This exceeds the WCAG AA minimum of 4.5:1.

The home-page statistics now use sand on forest (**10.64:1**) instead of orange on forest (**3.94:1**). Although the original large, bold figures met the WCAG 3:1 threshold for large text, this change also satisfies the project's stricter blanket requirement of at least 4.5:1 for all text.

## QA card-contrast follow-up

The three product-category pages and the dealer page were visually checked at 1440 px against the production build after setting specification and model cards to ink on white (**16.36:1**). Their headings and descriptions are visible in the following evidence:

- [`qa-producten-hefbruggen-1440.png`](./qa-producten-hefbruggen-1440.png)
- [`qa-producten-kantelaars-1440.png`](./qa-producten-kantelaars-1440.png)
- [`qa-producten-werkplaatsliften-1440.png`](./qa-producten-werkplaatsliften-1440.png)
- [`qa-dealer-worden-1440.png`](./qa-dealer-worden-1440.png)

## Pull-request preview status

Acceptance criterion 1 is **not currently achievable in this repository setup**. `.github/workflows/pages.yml` only deploys on a push to `main` (or a manual dispatch), while the issue requires a unique preview for every pull request. Consequently PR #2 cannot provide the required preview URL or issue attachment from the current workflow. This is intentionally left for a human decision: no production or Pages deployment was initiated as part of this follow-up, and this criterion must remain unchecked until preview infrastructure is approved and added.

Ontwikkelaar · GPT-5.6 Sol
