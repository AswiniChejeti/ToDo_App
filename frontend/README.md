# TaskFlow - Frontend Client

A high-performance, premium React frontend for TaskFlow, built with **Vite**, **Framer Motion**, and **Tailwind CSS**.

## 🚀 Setup and Run Instructions

1.  **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the `frontend` folder:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:3000`.

---

## 📸 Application Screenshots

### Landing Page
![Landing Page](../docs/screenshots/landing_page.png)

### Authentication (Login & Signup)
![Login Page](../docs/screenshots/login_page.png)
![Signup Page](../docs/screenshots/signup_page.png)

### Dashboard (Task Management)
![Dashboard Empty](../docs/screenshots/dashboard_empty.png)
![Dashboard Full](../docs/screenshots/dashboard_full.png)

---

## 🛠️ Technologies Used

-   **Framework**: React 18
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **State/Routing**: React Router 7
-   **Feedback**: React Hot Toast

---

## 🧠 Challenges and Solutions

### 1. Premium Glassmorphism UI
**Challenge**: Creating a UI that feels modern and high-end while maintaining readability and performance.
**Solution**: Leveraged Tailwind's `backdrop-blur` and custom HSL colors for a glassmorphism effect. Integrated Framer Motion for micro-interactions and smooth page transitions.

### 2. Task Synchronization
**Challenge**: ensuring the UI reflects backend changes immediately without flickering.
**Solution**: Implemented optimistic UI updates and robust error handling in the `api.js` service using Axios. Used React Hooks for efficient state management.

### 3. Drag-and-Drop Prioritization
**Challenge**: Implementing a functional drag-and-drop system that integrates with the backend order.
**Solution**: (Planned/Implemented) Used `@hello-pangea/dnd` for smooth list reordering and mapped the results to a reorder API endpoint.

### 4. SPA Routing on Deployment
**Challenge**: React Router paths causing 404 errors on browser refresh after deployment to Vercel.
**Solution**: Created a `vercel.json` rewrite configuration to ensure all requests are routed to `index.html`.
