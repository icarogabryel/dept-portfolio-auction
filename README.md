# Dept Portfolio Auction Web Application

This monorepo contains the source code for a web application that makes the auctioning of dept portfolios.

<!-- bids status, project on cascate, admin funcionando, namespace api e ws, environ, separação dos apps
em settings, asgi, celery, proteção de sterializers, entidade relacional, project structure -->

## ToDo List

- [ ] Backend
  - [x] Create portfolios model, serializers, views, and URL routing
  - [x] Create bids model, serializers, views, and URL routing
  - [ ] Create users serializers, views and URL routing (Uses Django's built-in User model)
  - [ ] Signals to update bids status
  - [ ] Enhance serializers with validation
  - [ ] Implement authentication and authorization (Owning, admin, etc.)
  - [ ] Lote creation of portfolios
  - [ ] Implement WebSocket support for real-time bidding updates
  - [ ] Implement Celery for background tasks (e.g., closing auctions, sending notifications)
  - [ ] Add unit tests for views and models
  - [ ] Add GitHub Actions for CI/CD
- [ ] Frontend
  - [ ] Create Login and Registration pages
  - [ ] Create active Portfolio listing and detail pages
  - [ ] Create user dashboard to view owned portfolios and bids
  - [ ] Implement real-time updates using WebSockets
