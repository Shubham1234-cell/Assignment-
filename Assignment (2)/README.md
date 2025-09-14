# Contracts Dashboard (React + Tailwind)

This is my assignment submission for a basic contracts management dashboard.

### What it does
- Login page (mock login, password is `test123` just for demo)
- Dashboard that lists contracts (with search, filters and pagination)
- Can click to see contract details (clauses, risks, etc. are just mock text)
- Upload section that simulates adding new files (shows success/error randomly)

### Tech I used
- React (with Vite setup)
- Tailwind for styling (kept it simple)
- Context API for login state

### How to run it
1. Install node modules: `npm install`
2. Run locally: `npm run dev`
3. It will usually start at `http://localhost:5173`

### Notes
- Contracts data is inside `public/contracts.json` (pretend it's an API)
- Detail page adds some dummy insights/clauses just to show the UI flow
- Didn’t overcomplicate state management, just plain React + hooks
