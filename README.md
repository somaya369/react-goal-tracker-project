# Goal Tracker

A modern, responsive React application for tracking personal goals with gamification features like streaks and XP levels. Supports multiple languages including RTL (Persian) and LTR (English) layouts.

## Features

- ✅ **Goal Management**: Create, edit, pause, resume, and delete goals
- ✅ **Goal Types**: Support for daily goals (days) and time-based goals (minutes)
- ✅ **Categories**: Organize goals into Health, Study, Work, Personal, or Other
- ✅ **Progress Tracking**: Log daily progress and view history
- ✅ **Gamification**: Earn XP points and maintain streaks for motivation
- ✅ **Dashboard**: Overview of active goals, completed goals, and statistics
- ✅ **Themes**: Light and dark mode support
- ✅ **Internationalization**: English and Persian language support
- ✅ **RTL/LTR Layout**: Automatic layout direction based on selected language
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Data Persistence**: Goals and stats stored in local storage
- ✅ **Charts**: Visual progress charts by category

## How to Run

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-goal-tracker-project.git
   cd react-goal-tracker-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Language RTL/LTR Explanation

The app supports two languages: English (LTR) and Persian (RTL). The layout direction automatically adjusts based on the selected language:

- **English (EN)**: Left-to-right (LTR) layout
- **Persian (FA)**: Right-to-left (RTL) layout

The RTL support is implemented using:
- `stylis-plugin-rtl` for CSS-in-JS RTL transformation
- Material-UI's RTL theme support
- Custom direction utilities in `src/styles/direction.js`

When Persian is selected, the entire UI flips to RTL mode, including text alignment, navigation, and component layouts.

## Streak + XP Rules

### Streaks
- **Daily Logging**: Maintain a streak by logging progress every day
- **Consecutive Days**: Streak increases by 1 for each consecutive day of logging
- **Same Day**: Logging multiple times on the same day doesn't increase the streak
- **Gap Reset**: If you miss a day (gap > 1 day), the streak resets to 1
- **Calculation**: Based on calendar days, not 24-hour periods

### XP (Experience Points)
- **Per Log**: Earn 20 XP points for each progress log entry
- **No Limits**: XP accumulates indefinitely
- **Level Calculation**: Level = floor(XP / 200) + 1
- **Purpose**: Provides long-term progression and achievement tracking


## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **date-fns** - Date utilities
- **Emotion** - CSS-in-JS styling
- **Local Storage** - Data persistence

## Project Structure

```
src/
├── app/                 # Main app components and routing
├── components/          # Reusable UI components
├── features/goals/      # Goal-related logic and storage
├── pages/               # Page components
├── data/                # Seed data
├── i18n/                # Internationalization
└── styles/              # Styling utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.</content>
<parameter name="filePath">c:\Users\rasooly com\Desktop\react-goal-tracker-project-main\react-goal-tracker-project-main\README.md
