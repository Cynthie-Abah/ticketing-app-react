# TicketFlow - React Frontend

This is the **React implementation** of TicketFlow, a multi-framework ticket management web application.

## Features

- **Landing Page**
  - Hero section with wavy SVG background.
  - Call-to-action buttons: Login, Get Started.
  - Decorative circles and card-like feature sections.
  - Responsive design; max-width 1440px, centered layout.
  - Consistent footer across pages.
- **Authentication**

  - Login & Signup pages with form validation.
  - Inline error messages & toast notifications.
  - Simulated with `localStorage` (`ticketapp_session` key).
  - Logout clears session.

- **Dashboard**

  - Summary statistics:
    - Total tickets
    - Open tickets
    - In-progress tickets
    - Resolved tickets
  - Navigation links to Ticket Management page.
  - Visible logout button.
  - Max-width 1440px, centered layout.

- **Ticket Management (CRUD)**
  - Create, Read, Update, Delete tickets.
  - Real-time validation.
  - Inline or toast feedback on actions.
  - Status colors: `open` → green, `in_progress` → amber, `closed` → gray.

## Dependencies

```json
{
  "@supabase/supabase-js": "^2.76.1",
  "@tailwindcss/vite": "^4.1.16",
  "@tanstack/react-query": "^5.90.5",
  "@tanstack/react-query-devtools": "^5.90.2",
  "lucide-react": "^0.546.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-hook-form": "^7.65.0",
  "react-hot-toast": "^2.6.0",
  "react-router-dom": "^7.9.4",
  "tailwindcss": "^4.1.16"
}

Setup
cd react-version
npm install
npm run dev


UI & State Structure

State Management: React Query + local state.

Forms: React Hook Form.

Routing: React Router DOM v7.

Notifications: React Hot Toast.

Icons: Lucide React.

Styling: TailwindCSS.

Visit https://ticketing-app-react.netlify.app/  to view the app.
```
