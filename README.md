# LinkFlow

LinkFlow is a full-stack web application for URL shortening and analytics. It allows users to create short URLs, track visits, and visualize analytics with a modern, responsive dashboard. The project uses a React + Vite frontend, a Node.js/Express backend, PostgreSQL with Prisma ORM, and Firebase for authentication.

---

## Features

- **User Authentication:**  
  Register and login with email/password or Google (via Firebase Auth).
- **URL Shortening:**  
  Create short URLs with optional custom aliases.
- **Dashboard:**  
  View all your shortened URLs in a sortable, filterable table.
- **Analytics:**  
  Track total visits, view visit history, and see analytics visualized with charts and a world map.
- **Ownership Verification:**  
  Verify website ownership to enable advanced analytics.
- **Modern UI:**  
  Responsive design with dark/light mode, built using Tailwind CSS and Radix UI components.

---

## Tech Stack

- **Frontend:**  
  React 19, Vite, TypeScript, Tailwind CSS, Schadcn UI
- **Backend:**  
  Node.js, Express, Prisma ORM, PostgreSQL
- **Authentication:**  
  Firebase Auth (email/password & Google)
- **Other:**  
  GitHub Actions for CI/CD

---

## Folder Structure

```
Site-Analyse/
  client/   # React frontend
  server/   # Node.js/Express backend
```

---

## License

MIT
