# Dept Portfolio Auction Web Application

This monorepo contains the source code for a web application that makes the auctioning of dept portfolios.

<!-- bids status, project on cascate, admin funcionando, namespace api e ws, environ, separação dos apps
em settings, asgi, celery, proteção de sterializers, entidade relacional, project structure, protec de bids
organization folder, validation and permissions, JWT authentication, tasks e signals, use of getter (property) and derivated properties, axios, cors headers, blacklist? guive admin access func? economia de bd por um lance por usuario/portfolio, editar perfil? csrf_exempt, owning permissions, signals, tasks, consumers -->

## Installation in Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/icarogabryel/dept-portfolio-auction.git
   cd dept-portfolio-auction
   ```

2. Copy the example environment to create your own `.env` file:

   ```bash
   cp backend/.env.example backend/.env
   ```

   ```bash
    cp frontend/.env.example frontend/.env
    ```

3. Install Redis if not already installed:

   ```bash
   sudo apt update
   sudo apt install redis-server -y
   ```

4. Run the installation script:

   ```bash
   source scripts/install_dev.sh
   ```

5. Create a superuser for admin access:

   ```bash
   cd backend
   python3 manage.py createsuperuser
   ```

6. Start the development servers:
    Open two terminal tabs.

    In the first terminal, make sure Redis is running (Automatically starts on installation, but you can start it manually if needed):

    ```bash
    redis-server
    ```

    In the second terminal, start the Django development server:

    ```bash
    cd backend
    python3 manage.py runserver
    ```

    In the third terminal, start the React development server:

    ```bash
    cd frontend
    npm run dev
    ```

## Repository Structure

## ToDo List

- [ ] Backend
  - [x] Create portfolios model, serializers, views, and URL routing
  - [x] Create bids model, serializers, views, and URL routing
  - [X] Create users serializers, views and URL routing (Uses Django's built-in User model)
  - [X] Create notifications model, views, and URL routing
  - [X] Implement JWT authentication
  - [X] Implement authorization (Owning, admin, etc.)
  - [X] Lote creation of portfolios
  - [X] Implement WebSocket support for real-time updates using Django Channels
  - [X] Implement Celery for background tasks (e.g., closing auctions, sending notifications)
  - [X] Implement Notifications system
    - [X] Send notification when a user is outbid
    - [X] Send notification when a portfolio auction is closed (Winner and losers)
    - [X] 30 minutes before auction ends
  - [ ] Add swagger API documentation
  - [ ] Add unit tests for views and models
  - [ ] Add GitHub Actions for CI/CD
- [ ] Frontend
  - [X] Create Login and Registration page
  - [X] Create active Portfolios listing and detail page
  - [X] Create view owned portfolios bids page
  - [X] Create admin dashboard for managing and listing all portfolios (active or not)
  - [X] Create admin create portfolio(s) page
  - [X] Implement real-time updates using WebSockets in frontend
  - [X] Implement notifications UI
- [X] Integrate frontend with backend APIs
- [ ] Create Docker setup for easy deployment
- [ ] Write comprehensive documentation
