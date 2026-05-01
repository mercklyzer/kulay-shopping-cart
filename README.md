# Kulay — Shopping Cart

A React Native shopping cart app built with **Expo SDK 54**, submitted as my application to **Kulay**.

## Demo

<!-- Replace with actual video URL -->
[📹 Watch the demo video](https://YOUR_VIDEO_URL_HERE)

## Features

- **Product catalog** — Browse 4 curated food & beverage items displayed as cards
- **Add to cart** — Tap to add; use +/− controls to adjust quantity directly from the shop
- **Cart management** — View items, update quantities, or remove them individually
- **Voucher system** — Apply the code `discount10` for 10% off the order total
- **Order summary** — Live subtotal, discount breakdown, and final total
- **Cart badge** — Real-time item count shown on the tab bar icon
- **Haptic feedback** — Subtle tap feedback on add/remove actions via `expo-haptics`

## Design

All styling uses **NativeWind v4** (Tailwind CSS for React Native) — no `StyleSheet.create` or inline style objects. The UI follows a clean, minimal layout with an orange accent (`#FF6B35`) and Tailwind utility classes applied via `className`.

## Getting Started

### Run locally

```bash
npm install
npx expo start
```

Then press **a** to open on a connected Android device/emulator, or scan the QR code with Expo Go.

### Test the APK

A pre-built APK is included in the repo: [`kulay-shopping-cart.apk`](kulay-shopping-cart.apk). Transfer it to any Android device and install directly.

To build a fresh APK yourself with EAS:

```bash
npx eas-cli build --profile preview --platform android
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK 54 · React Native 0.81.5 · React 19 |
| Routing | Expo Router v6 (file-based) |
| Styling | NativeWind v4 · Tailwind CSS 3.4 |
| State | `useReducer` + `useContext` (no external libraries), `useState` for input |
| Language | TypeScript 5.9 (strict mode) |
| Tooling | Biome 2 (formatter + linter) |

## Limitations

- **No `useMemo` / `useCallback`** — no performance issues were encountered during development, so these hooks were intentionally omitted to avoid premature optimization
- **No checkout or payment flow** — the cart is the final step
- **No persistence** — cart state is ephemeral and resets on app restart (no AsyncStorage, SQLite, or any caching layer)
- **No search or filtering** — products are displayed as a static list
- **No authentication** — no user accounts or sessions
- **Android only** — no iOS build deliverable
