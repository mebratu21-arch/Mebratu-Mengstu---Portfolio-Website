# Mebratu Mengstu | Full-Stack Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://mebratu-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github)](https://github.com/mebratu21-arch)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mebratu21)

A modern, full-stack portfolio application showcasing my expertise as a Full-Stack Developer. Built with **React** (Vite) on the frontend and **Node.js/Express** with **PostgreSQL** on the backend.

![Portfolio Preview](docs/assets/logo.png)

---

## 🚀 Features

| Feature | Description |
| ------- | ----------- |
| **Full-Stack Architecture** | React SPA frontend served by a robust Express backend. |
| **Dynamic Content** | Projects and messages managed via PostgreSQL database. |
| **Admin Dashboard** | Secure, password-protected admin area to manage content. |
| **User Engagement** | Real-time "Like" button for projects. |
| **Contact System** | Functional contact form saving messages to DB (with mailto fallback). |
| **Responsive Design** | Mobile-first approach using Bootstrap 5 & Custom CSS. |
| **Interactive UI** | Scroll animations, typing effects, and smooth transitions. |

---

## 🛠️ Tech Stack

### Frontend

- **React 18** (Vite)
- **Bootstrap 5** & React-Bootstrap
- **Intersection Observer API** for animations
- **Font Awesome** for icons

### Backend

- **Node.js** & **Express**
- **PostgreSQL** (Neon DB)
- **RESTful API**
- **Authentication**: `express-session`, `connect-pg-simple`, `bcryptjs`

---

## 📂 Project Structure

```text
portfolio/
├── client/                 # React Frontend
│   ├── src/                # Components & Hooks
│   ├── public/             # Static Assets
│   └── dist/               # Production Build
├── server/                 # Node.js Backend
│   ├── routes/             # API Endpoints (projects, messages, auth)
│   ├── middleware/         # Auth Middleware
│   └── db.js               # Database Connection
└── admin.html              # Admin Dashboard (Lightweight client)
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Local or Cloud like Neon)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mebratu21-arch/Mebratu-Mengstu---Portfolio-Website.git
    cd Mebratu-Mengstu---Portfolio-Website
    ```

2.  **Install Dependencies**
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server/` directory:
    ```env
    DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
    PORT=3000
    SESSION_SECRET=your_secret_key
    ADMIN_PASSWORD_HASH= # Generate with bcrypt
    ```

4.  **Database Migration**
    ```bash
    cd server
    node seed.js           # Seeds initial project data
    node migrate_likes.js  # Adds 'likes' column
    node migrate_session.js # Adds session table
    ```

5.  **Build Frontend**
    ```bash
    cd ../client
    npm run build
    ```

6.  **Run Application**
    ```bash
    cd ../server
    node index.js
    ```
    Visit `http://localhost:3000`

---

## 🔐 Admin Access

The admin dashboard is located at `/admin`.
- **Default Password:** Configured via `ADMIN_PASSWORD_HASH` in `.env`.
- Capabilities: Add/Edit/Delete projects, View/Delete messages.

---

## 📬 Contact

**Mebratu Mengstu**
Full-Stack Developer | Tel Aviv, Israel

- **Email:** [mebratu21arch@gmail.com](mailto:mebratu21arch@gmail.com)
- **LinkedIn:** [linkedin.com/in/mebratu21](https://www.linkedin.com/in/mebratu21)
- **GitHub:** [github.com/mebratu21-arch](https://github.com/mebratu21-arch)

---

## License

This project is open source and available under the [MIT License](LICENSE).
