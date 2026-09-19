# Session Clock

A React-based Session Clock that provides a session and break timer
for focused work and short breaks.

## Live Project

**Live URL:**\
<https://session-clock-fcc.onrender.com/>

**CodeSandbox:**\
<https://codesandbox.io/p/sandbox/fcc-session-clock-w8ktqx>

## GitHub Repository

**GitHub:**\
https://github.com/satyam-7777/Session-Clock-FCC

## Features

- Session timer with a default duration of 25 minutes
- Break timer with a default duration of 5 minutes
- Increase or decrease session duration
- Increase or decrease break duration
- Minimum duration of 1 minute
- Maximum duration of 60 minutes
- Start and pause the timer
- Reset the timer and restore default settings
- Automatically switches between Session and Break
- Plays an audio notification when the timer reaches zero
- Displays the remaining time in `MM:SS` format
- Prevents duration changes while the timer is running
- Uses React Hooks for timer and state management

## Tech Stack

- React
- JavaScript
- CSS

## Timer Display

The timer section displays:

- The current timer label (`Session` or `Break`)
- The remaining time in `MM:SS` format
- The start/pause control
- The reset control

The timer starts with:

```text
Session: 25:00
Break: 5:00
```

## Timer Handling

When the timer reaches zero:

- The notification sound is played.
- A Session automatically switches to Break.
- A Break automatically switches to Session.
- The timer is reset using the configured session or break duration.

## Audio Notification

The sound is played whenever the timer reaches zero.
`

## Installation

Clone the repository:

```bash
git clone https://github.com/satyam-7777/Session-Clock-FCC.git
```

Move into the project directory:

```bash
cd Session-Clock-FCC
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

## Author

**Satyam Patel**

This project was created as part of my FreeCodeCamp Front End
Development Libraries certification.
