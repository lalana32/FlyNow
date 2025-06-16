# ✈️ FlyNow — Microservices-Based Web Application (In Development)

> **Status:** In active development 🚧  
> FlyNow is a scalable, microservices-based web application for flight management and booking, currently being built as part of my graduation project.

---

## 🔧 Technologies Used

### Backend (C# / .NET 9 — Microservices)

- **.NET 9** — latest version of the .NET platform
- **Entity Framework Core 9**
- **ASP.NET Identity + JWT Authentication**
- **RabbitMQ** — for asynchronous, decoupled communication between services
- **PostgreSQL** — primary database for services
- **YARP (Yet Another Reverse Proxy)** — reverse proxy and gateway
- **Swashbuckle / Swagger** — for API documentation and testing

**Core Microservices:**
- `AuthService` — Handles user authentication, authorization, and JWT token issuance
- `EmailService` — Sends transactional emails (e.g., registration, password reset)
- `FlightService` — Manages flight search, itineraries, and seat availability
- `YarpProxy` — Reverse proxy that routes all frontend and external traffic to the appropriate backend service

---

### Frontend (React + TypeScript)

- **React 19 + TypeScript**
- **Vite** — ultra-fast build tool
- **Material UI 7** — responsive and elegant UI components
- **React Router v7** — declarative client-side routing
- **React Hook Form** — performant form state management
- **Redux Toolkit** — state management made simple and scalable
- **TanStack Query (React Query)** — powerful data-fetching and caching layer
- **Axios** — API communication layer
- **React Icons**, **React-to-PDF**, **Lodash.debounce**, and more

---

## 🐳 Infrastructure & Docker

The application runs fully containerized using **Docker Compose**.

| Service       | Port (Local) | Description                         |
|---------------|--------------|-------------------------------------|
| YARP Proxy    | `5000`       | Reverse proxy for all backend APIs  |
| AuthService   | `5001`       | Handles authentication & tokens     |
| EmailService  | `5002`       | Responsible for sending emails      |
| PostgreSQL    | `5433`       | Relational database                 |
| RabbitMQ      | `15672` (UI), `5672` | Message broker for microservice communication |

Each service is independently deployable and communicates via REST and RabbitMQ. Health checks and wait-for scripts ensure safe startup order.

---

## 🚀 Getting Started (Development)

> ⚠️ **Note:** This project is still under active development. Expect rapid iteration and frequent changes.

### Prerequisites:
- Docker + Docker Compose
- Node.js ≥ 18
- .NET SDK 9

### Backend:
```bash
docker-compose up --build
```
### Frontend:
```bash
cd frontend
npm install
npm run dev
```
