# Goal Tracker Dashboard

A simple goal tracking app built with React + Vite.

## 🧩 Features (Checklist)

- ✅ Routing + Pages (full routing + pages)
  - Dashboard, Goals list, Goal details, Create goal, Categories, Settings, 404
- ✅ CRUD + Persistence (Create, Read, Update, Delete) with `localStorage`
- ✅ Progress tracking + Calculations (percent, streak, XP, category chart)
- ✅ RTL/LTR support (Persian RTL + English LTR)
- ✅ UI/UX + responsiveness (responsive layout with MUI)
- ✅ Code quality (clean folder structure, reusable components/hooks)

## ▶️ How to run

```bash
# enter the project folder
cd react-goal-tracker-project

# install dependencies
npm install

# run dev server
npm run dev
✅ Then open the browser at http://localhost:5173/.

For production build:
npm run build
npm run preview
🌐 Language / RTL vs LTR
There is a language toggle at the top right (EN / FA).
When Persian is selected:
UI is shown in Persian.
Document direction (dir) switches to rtl (right-to-left).
A suitable RTL font is used.
When English is selected:
UI is shown in English.
Document direction returns to ltr.
Where it’s implemented: src/i18n/i18n.jsx and src/styles/direction.js

⭐ Streak + XP rules
🎯 XP
Each time you click “Mark progress” (add a log), you earn 20 XP.
XP is stored in localStorage and persists after closing the browser.
🔥 Streak
Streak logic works like this:

If you log progress today and also logged progress yesterday → streak +1.
If you log progress today but did not log yesterday → streak resets to 1.
If you log multiple times in the same day → streak does not increase (same day counts once).
Implementation: src/features/goals/goalUtils.js (nextStreak function)

📸 Screenshots (for extra points)
To get the optional +10 points, include screenshots of:

Desktop view (Dashboard or Goals list)
Mobile view (show responsiveness)
RTL view (Persian)
Tip for capturing:

Windows: Win + Shift + S (Snipping Tool)
Mac: Cmd + Shift + 4
🗂️ Project structure
src/app/ – Router setup, theme, layout
src/pages/ – Main pages (Dashboard, Goals, Settings, etc.)
src/components/ – Reusable UI components (cards, nav, dialog, etc.)
src/features/goals/ – Goal logic (CRUD, persistence, calculations)
src/i18n/ – Localization and settings
📦 GitHub repo
To publish the project on GitHub and get a shareable link:

cd react-goal-tracker-project
git init
git add .
git commit -m "Initial commit"
