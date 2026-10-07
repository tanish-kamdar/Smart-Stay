# SmartStay

SmartStay is a full-stack accommodation listing platform inspired by modern travel and rental marketplaces. It allows users to browse stay listings, create and manage property entries, upload photos, leave reviews, and authenticate securely with session-based login.

This project was built as a student personal project to demonstrate practical full-stack development using Node.js, Express, MongoDB, and modern cloud services.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Application Flow](#application-flow)
- [Routes](#routes)
- [Data Models](#data-models)
- [Deployment](#deployment)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [License](#license)

## Overview

SmartStay is designed to simulate a real-world lodging marketplace where:

- Guests can browse available properties
- Hosts can add, edit, and delete listings
- Users can create accounts and log in securely
- Visitors can leave reviews for homes or stays
- Listings include cloud-hosted images and location data
- Mapbox is used to geocode property locations

The application follows a typical MVC-style structure and uses server-side rendering with EJS templates.

## Features

### User Features
- User signup and login using Passport.js local authentication
- Session-based access control and redirects
- Flash messages for success, error, and validation feedback
- Protected routes for listing management and review actions

### Listing Features
- View all property listings on the home page
- Create new listings with title, description, price, location, and country
- Upload listing images via Cloudinary
- Edit or delete listings owned by the authenticated user
- Geocode location strings into latitude/longitude for map integration

### Review Features
- Add reviews to listings
- Restrict review deletion to the authorized author
- Auto-cleanup associated reviews when a listing is deleted

### Platform Features
- MongoDB Atlas integration for persistence
- Cloudinary storage for image hosting
- Mapbox geocoding for location mapping
- Express middleware for validation and authorization
- Server-side rendered views with EJS and EJS Mate

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

### Frontend
- EJS templating engine
- HTML5/CSS3
- JavaScript
- Bootstrap-inspired styling (custom CSS in public/css)

### Authentication & Security
- Passport.js
- Passport Local Strategy
- Express Session
- Connect Flash

### External Services
- MongoDB Atlas
- Cloudinary
- Mapbox

### Dev Tools
- Nodemon
- dotenv
- method-override
- Joi validation

## Architecture

The application follows a modular architecture based on a common Express setup:

- App entry point in `app.js`
- Route modules for listings, users, and reviews
- Controller layer for business logic
- Model layer for MongoDB schemas
- Middleware for validation, ownership checks, and authentication
- Views for EJS templates
- Public assets for static CSS/JS files

This separation keeps the codebase maintainable and mirrors industry-standard backend application patterns.

## Project Structure

```text
Smart-Stay/
├── app.js
├── cloudConfig.js
├── connectDB.js
├── middleware.js
├── package.json
├── schema.js
├── README.md
├── .env
├── assets/
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/
│   └── data.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   └── js/
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
├── uploads/
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
└── views/
    ├── error.ejs
    ├── includes/
    ├── layouts/
    ├── listings/
    └── user/
```

## Prerequisites

Before running this project locally, ensure you have:

- Node.js 18+ recommended
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account
- Mapbox access token

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Smart-Stay.git
cd Smart-Stay
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables as described below.

4. Start the server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/SmartStay
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_access_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Notes
- `ATLASDB_URL` should point to your MongoDB Atlas database or a local Mongo-compatible instance.
- `SECRET` is used for session encryption.
- `MAP_TOKEN` enables Mapbox geocoding for listing locations.
- Cloudinary variables power image upload storage.

## Running the Application

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The app will typically run on:

```text
http://localhost:3000
```

## Application Flow

1. User accesses the homepage and browses listings.
2. User signs up or logs in to gain access to protected actions.
3. Authenticated users can create new stays with images and metadata.
4. The app geocodes the location and stores coordinates in MongoDB.
5. Users can view a listing detail page and add reviews.
6. Owners can update or remove their own listings.

## Routes

### Public Routes
- `GET /` — Home page showing all listings
- `GET /listings` — Listings index
- `GET /listings/:id` — Listing detail page
- `GET /user/signup` — Signup page
- `POST /user/signup` — Create user account
- `GET /user/login` — Login page
- `POST /user/login` — Authenticate user

### Protected Routes
- `GET /listings/new` — Create listing form
- `POST /listings` — Add a listing
- `GET /listings/:id/edit` — Edit listing form
- `PUT /listings/:id` — Update a listing
- `DELETE /listings/:id` — Delete a listing
- `POST /listings/:id/reviews` — Add a review
- `DELETE /listings/:id/reviews/:reviewId` — Delete review
- `GET /user/logout` — Log out user

## Data Models

### Listing
The `Listing` model includes:
- `title`
- `description`
- `image.url`
- `image.filename`
- `price`
- `location`
- `country`
- `owner` reference to `User`
- `reviews` array of review references
- `geometry` with GeoJSON `Point` coordinates

### User
The `User` model uses Passport Local Mongoose and stores:
- `username`
- `email`
- hashed password managed by Passport

### Review
The review model includes:
- `rating`
- `body`
- `author` reference to `User`
- associated listing reference

## Deployment

This project is suitable for deployment on cloud platforms such as:

- Render
- Railway
- Heroku
- DigitalOcean App Platform
- Azure App Service

### Deployment Notes
- Set environment variables in the deployment platform dashboard
- Ensure MongoDB Atlas is reachable from the deployed app
- Configure Cloudinary and Mapbox credentials in production
- Use a secure production secret for sessions

## Testing

The repository currently has a placeholder test script in `package.json` and does not yet include a full automated test suite.

Current command:

```bash
npm test
```

This will print an error until proper tests are implemented. For a production-ready version, the next recommended step is to add:

- unit tests for middleware and controllers
- integration tests for CRUD routes
- authentication flow tests
- validation tests for listing and review schemas

## Future Improvements

Planned enhancements could include:

- booking and reservation functionality
- payment integration
- admin dashboard
- user profile pages
- search and filter functionality
- map visualization with interactive markers
- improved UI/UX and responsiveness
- CI/CD setup with GitHub Actions
- automated testing and linting

## License

This project is currently unlicensed. If you plan to share or publish it publicly, it is recommended to add an appropriate license such as MIT.

## Acknowledgements

This project uses the following ecosystems and services:

- Node.js and Express
- MongoDB and Mongoose
- Passport.js
- Cloudinary
- Mapbox
- EJS templating

---

Developed as a student full-stack personal project focused on building a practical web application with real-world backend patterns and external API integrations.
