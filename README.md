# Real-Time Trading Dashboard

A real-time cryptocurrency and stock ticker dashboard built with **React + TypeScript**, powered by a **Node.js WebSocket + REST API backend**.  
The application streams live price updates and visualizes them in an interactive chart.

This project demonstrates:

- Real-time data streaming
- REST + WebSocket architecture
- Clean React architecture
- Client-side caching
- Responsive UI
- Containerized deployment using Docker



## Demo Overview

The dashboard provides:

- Live ticker list
- Real-time price updates
- Interactive price chart
- Historical price data
- WebSocket streaming updates
- Responsive layout

Data is fetched initially through **REST APIs** and then continuously updated via **WebSockets**.



## Architecture

```
trading-dashboard
│
├── backend
│   ├── src
│   │   ├── server.ts
│   │   ├── market
│   │   │   ├── marketData.ts
│   │   │   └── priceGenerator.ts
│   │   ├── routes
│   │   │   └── tickers.ts
│   │   ├── websocket
│   │   │   └── marketStream.ts
│   │   └── types
│   │       └── market.ts
│   ├── tests
│   │   ├── marketSimulator.test.ts
│   │   └── tickersRoutes.test.ts
│   │
│   └── Dockerfile
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── chart
│   │   │   │   └── PriceChart.tsx
│   │   │   ├── dashboard
│   │   │   │   └── Dashboard.tsx
│   │   │   └── ticker
│   │   │       ├── TickerList.tsx
│   │   │       └── TickerListItem.tsx
│   │   │
│   │   ├── hooks
│   │   │   ├── useTickers.ts
│   │   │   ├── useTickerHistory.ts
│   │   │   └── useTickerStream.ts
│   │   │
│   │   ├── services
│   │   │   ├── api.ts
│   │   │   └── websocket.ts
│   │   │
│   │   ├── styles
│   │   │   └── dashboard.css
│   │   │
│   │   ├── types
│   │   │   └── market.ts
│   │   │
│   │   ├── utils
│   │   │   └── format.ts
│   │   │
│   │   └── App.tsx
│   │
│   ├── Dockerfile
│   │
│   └── .env.example
│
└── docker-compose.yml
```



## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Query (data caching)
- Recharts (charts)
- WebSocket API

#### Environment Variables

Create a `.env` file inside the `frontend` folder:

```
cp .env.example .env
```

### Backend

- Node.js
- Express
- TypeScript
- WebSocket (ws)
- Mock market data generator

### DevOps

- Docker
- Docker Compose


## How Data Flows

1️⃣ Frontend loads initial ticker data via REST API.

```
GET /api/tickers
```

2️⃣ When a ticker is selected:

```
GET /api/history/:symbol
```

3️⃣ Backend streams real-time updates using WebSocket.

```
ws://localhost:3000
```

4️⃣ Frontend merges:

- historical REST data
- live WebSocket updates

into a single chart dataset.



## Backend API

### Get all tickers

```
GET /api/tickers
```

Example response:

```json
[
  {
    "symbol": "BTC-USD",
    "name": "Bitcoin",
    "price": 64215.22
  }
]
```

---

### Get historical data

```
GET /api/history/:symbol
```

Example:

```
GET /api/history/BTC-USD
```

Response:

```json
[
  {
    "timestamp": 1711000000000,
    "price": 64215.22,
    "symbol": "BTC-USD"
  }
]
```



## WebSocket Stream

```
ws://localhost:3000
```

Example message:

```json
{
  "symbol": "BTC-USD",
  "price": 64230.11,
  "timestamp": 1711000123456
}
```

Messages are emitted every second for all tickers.



## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/harkalopchan/trading-dashboard/
cd trading-dashboard
```

---

### 2. Start backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

### 3. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```



## Running Tests

Basic backend unit tests are included to validate the market simulator and API routes.

### Run backend tests

```bash
cd backend
npm install
npm test
```

The test suite runs using **Vitest**.

These tests verify:

- Market price simulation logic
- Correct behavior of ticker REST API endpoints
- Historical data responses
- Stability of the mock data generator




## Running with Docker

You can run the entire stack with Docker.

#### Build and start containers

```bash
docker compose up --build
```

Open:

```
http://localhost:5173
```

---

### Stop containers

```bash
docker compose down
```



## Key Design Decisions

### REST + WebSocket architecture

REST APIs provide predictable initial data loading while WebSockets deliver real-time updates efficiently.

---

### React Query for caching

React Query is used to:

- cache ticker lists
- cache historical price data
- reduce unnecessary API calls
- improve UI responsiveness

---

### Live state merging

Live WebSocket updates are merged into chart data while:

- preventing duplicate timestamps
- limiting chart size to recent points
- maintaining smooth chart updates

---

### Separation of concerns

Components are split into:

```
data hooks
services
UI components
page containers
```

This improves maintainability and testability.



## Assumptions

The project assumes:

- market data is simulated
- price updates occur every second
- tickers remain static during runtime
- history length is limited to recent points for chart clarity



## Trade-offs

#### Simplified market simulation

Market prices are randomly generated rather than pulled from real APIs.

This keeps the backend lightweight for the coding challenge.

---

#### No persistent storage

Historical data is generated in memory rather than stored in a database.

For production systems, a time-series database would typically be used.

---

#### No authentication

Authentication was intentionally omitted to keep focus on:

- real-time data streaming
- frontend architecture



## Possible Improvements

If this project were extended further:

- persistent market data storage
- authentication and user preferences
- price alerts and notifications
- better chart interaction
- production WebSocket scaling
- Kubernetes deployment



## Author

**Harka Man Tamang**  
Senior Frontend Engineer  
Dubai, UAE



## Final Note

This project demonstrates a real-time frontend architecture combining:

- REST APIs
- WebSockets
- React Query caching
- modular React component design
- containerized deployment
It is designed to be easily extendable into a production trading dashboard.
