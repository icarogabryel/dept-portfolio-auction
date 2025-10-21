# Dept Portfolio Auction Web Application

This monorepo contains the source code for a web application that makes the auctioning of dept portfolios.

<!-- bids status, project on cascate, admin funcionando, namespace api e ws, environ, separação dos apps
em settings, asgi, celery, proteção de sterializers, entidade relacional, project structure, protec de bids
organization folder, validation and permissions, JWT authentication, tasks e signals, use of getter (property) and derivated properties, axios, cors headers, blacklist? guive admin access func? economia de bd por um lance por usuario/portfolio, editar perfil? csrf_exempt, owning permissions, signals -->

## ToDo List

- [ ] Backend
  - [x] Create portfolios model, serializers, views, and URL routing
  - [x] Create bids model, serializers, views, and URL routing
  - [X] Create users serializers, views and URL routing (Uses Django's built-in User model)
  - [ ] Create notifications model, views, and URL routing
  - [ ] Signals to update bids status
  - [ ] Enhance serializers with validation
  - [X] Implement JWT authentication
  - [X] Implement authorization (Owning, admin, etc.)
  - [ ] Lote creation of portfolios
  - [ ] Implement WebSocket support for real-time bidding updates
  - [ ] Implement Celery for background tasks (e.g., closing auctions, sending notifications)
  - [ ] Implement Notifications system
    - [X] Send notification when a user is outbid
    - [ ] Send notification when a portfolio auction is closed (Winner and losers)
    - [ ] 30 minutes before auction ends
  - [ ] Add unit tests for views and models
  - [ ] Add GitHub Actions for CI/CD
- [ ] Frontend
  - [X] Create Login and Registration page
  - [X] Create active Portfolios listing and detail page
  - [ ] Create view owned portfolios and bids page
  - [X] Create admin dashboard for managing and listing all portfolios (active or not)
  - [ ] Create admin create portfolio(s) page
  - [ ] Implement real-time updates using WebSockets
  - [ ] Implement notifications UI
- [ ] Integrate frontend with backend APIs
- [ ] Create Docker setup for easy deployment
- [ ] Write comprehensive documentation
