# RK RAJA Snap Bot

**Local · Offline · Demo**

Line-by-line message simulation with File Mode, prefix, here-name, interval control
aur ek clean pink/white console. **Koi Snapchat login nahi, koi network request nahi.**

## Features

- 📄 Single `.txt` file — line-by-line processing
- 🚫 Empty lines ignored
- 🏷️ Snap Prefix support → `prefix <line>`
- 🏷️ Here Name support → `HereName: <line>`
- ⏱️ Interval in ms / seconds
- ▶️ Start / ■ Stop buttons
- 📊 Live progress: line X / total
- 💾 Settings localStorage + server file me save
- 🎨 Pink/white RK RAJA theme
- 📱 Termux / Android compatible
- 🔒 100% offline

## Setup (Termux)

```bash
pkg install nodejs -y
cd rk-raja-snap-bot
npm install
npm start
```

Open: **http://localhost:3000**

## Setup (Desktop)

```bash
npm install
npm start
```

## Scripts

| Script | Kaam |
|---|---|
| `npm start` | Server start |
| `npm run dev` | Same as start |
| `npm run clean` | node_modules + settings delete |
| `npm run reinstall` | Clean + install |
| `npm run info` | Version print |

## Disclaimer

Yeh purely ek **local demo** hai. Yeh Snapchat se connect nahi hota,
login nahi karta, OTP nahi leta, message nahi bhejta. UID aur API fields
sirf local configuration ke liye hain.
