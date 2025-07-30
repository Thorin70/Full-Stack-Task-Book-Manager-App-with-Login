
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

Live demo[[Live](https://fullstackbookstoretask.netlify.app/)]



# Book Manager Neon

Welcome to **Book Manager Neon**, a full-featured web application for managing a personal book collection. This project showcases a sleek, responsive, and modern user interface with a stylish neon theme. Users can view a public catalog of books, and authenticated users can perform full CRUD (Create, Read, Update, Delete) operations.

The entire application is built as a self-contained frontend project, using an in-memory mock API to simulate backend services and user authentication.


---

## ✨ Features

- **Public Book Catalog**: Anyone can view the list of available books upon visiting the site.
- **User Authentication**: Secure login/logout functionality using a mock JWT system.
- **CRUD Operations**: Authenticated users can easily **C**reate, **R**ead, **U**pdate, and **D**elete books.
- **Responsive Design**: A fully responsive interface that works seamlessly on desktops, tablets, and mobile devices.
- **Neon UI/UX**: A dark, neon-themed design with glowing elements and smooth transitions for a visually engaging experience.
- **Modal-driven Forms**: Non-intrusive modals for Login, Add Book, and Edit Book forms keep the UI clean.
- **Confirmation Modals**: Prevents accidental deletions with a clear confirmation step.
- **Real-time Notifications**: Users receive instant feedback for actions like adding, updating, or deleting books via auto-dismissing alerts.


---

## 🛠️ Tech Stack

This project is built with modern frontend technologies:

- **Frontend**:
  - **React 19**: A powerful JavaScript library for building user interfaces.
  - **TypeScript**: Adds static typing to JavaScript for improved scalability and developer experience.
  - **Tailwind CSS**: A utility-first CSS framework for rapid, custom UI development.
- **State Management**:
  - **React Context API**: Used for managing global state like authentication status.
- **Backend (Mock API)**:
  - An in-memory API service (`services/api.ts`) that simulates network latency and handles data persistence for the duration of the session. It mimics a standard REST API.


---

## 🚀 Getting Started & Usage

This is a self-contained project that runs directly in a compatible browser-based development environment. No complex setup is needed.

### How to Use the App

1.  **View Books**:
    -   Simply open the application to see the public list of books.

2.  **Admin Functions (Add, Edit, Delete)**:
    -   Click the **"Sign In"** button in the header.
    -   A login modal will appear. Use one of the hardcoded credentials from the mock API:
        -   **Username**: `admin` / **Password**: `admin123`
        -   **Username**: `user1` / **Password**: `user123`
    -   Upon successful login, the header will update to show **"Add Book"** and **"Logout"** buttons.
    -   Action buttons for **Edit** and **Delete** will now appear on each book card.
    -   Click **"Logout"** to end your session and return to the public view.

---

## 📁 File Structure

The project is organized into a clear and scalable component-based structure.

```
/
├── public/
│   └── favicon.svg         # Application favicon
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Alert.tsx
│   │   ├── BookCard.tsx
│   │   ├── BookForm.tsx
│   │   ├── ConfirmationModal.tsx
│   │   ├── Dashboard.tsx   # Main view component
│   │   ├── Header.tsx
│   │   ├── Icons.tsx       # SVG icon components
│   │   └── Login.tsx
│   ├── context/
│   │   └── AuthContext.tsx # Global state for authentication
│   ├── services/
│   │   └── api.ts          # Mock backend API service
│   ├── App.tsx             # Root application component
│   ├── index.tsx           # React entry point
│   └── types.ts            # Shared TypeScript types
│
├── index.html              # Main HTML file with Tailwind CSS config
├── metadata.json           # Application metadata
└── README.md               # This file
```

---


