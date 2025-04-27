# EU-TIRADS-PL Calculator

A web-based calculator for thyroid nodule classification using the EU-TIRADS-PL system. This tool is designed to assist medical professionals in categorizing thyroid nodules based on ultrasound characteristics.

## ⚠️ Disclaimer

**TEST VERSION ONLY**
This calculator cannot be used as a basis for diagnostic and therapeutic decisions.

## 🚀 Quick Start

### Prerequisites

-   Node.js (version 22 or higher)
-   npm (usually comes with Node.js)

### Installation

#### Using Docker

1. Install Docker and Docker Compose

2. Run development server:

    ```bash
    docker compose up
    ```

3. Run production server:

    ```bash
    docker compose -f docker-compose.prod.yml up --build
    ```

    If you want to use a different port, set the `PORT` environment variable in the `.env` file.

### Using Node.js

1. Install dependencies:

    ```bash
    npm install
    ```

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Build for production (files will be in the `dist` folder):

    ```bash
    npm run build
    ```

4. Preview production build:

    ```bash
    npm run preview
    ```

## 👥 Authors

-   Wiktor Sadowy - Department of Artificial Intelligence
-   Tomasz Hałas - Department of Artificial Intelligence
-   Piotr Durniat - Department of Artificial Intelligence
-   Tomasz Tomkalski - Faculty of Medicine (Idea and Cooperation)
