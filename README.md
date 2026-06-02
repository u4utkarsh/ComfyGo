# ComfyGo

ComfyGo is a ride-booking platform designed to connect users with captains (drivers) for seamless and secure transportation. The application features real-time ride management, user authentication, and interactive maps, providing a modern and user-friendly experience.

## Features

- **User & Captain Authentication**: Secure signup, login, and email verification for both users and captains.
- **Profile Management**: Edit profile details for users and captains.
- **Ride Booking**: Users can book rides, select vehicle types, and view ride history.
- **Captain Dashboard**: Captains can view and manage ride requests, update ride status, and access ride history.
- **Real-Time Communication**: Integrated chat between users and captains using WebSockets.
- **Location Suggestions**: Smart location input with Google Maps API integration.
- **Email Notifications**: Automated emails for verification, password reset, and ride updates.
- **Protected Routes**: Role-based access control for user and captain screens.
- **Responsive UI**: Modern, mobile-friendly frontend built with React and Tailwind CSS.
- **Logging**: Backend and frontend logging for monitoring and debugging.

## Tech Stack

### Frontend

- **React** (Vite)
- **Tailwind CSS**
- **Socket.IO Client**

### Backend

- **Node.js**
- **Express.js**
- **Socket.IO**
- **MongoDB** (Mongoose)
- **JWT Authentication**
- **Nodemailer**
- **Google Maps API**

## Project Structure

- **Frontend/**: Contains all React components, screens, contexts, hooks, and assets.
- **Backend/**: Contains server code, controllers, models, routes, services, and configuration files.

## Getting Started

1. Clone the repository.
2. Set up the `.env` files for both backend and frontend with your configuration.
3. Install dependencies:
   - Frontend: `cd Frontend && npm install`
   - Backend: `cd Backend && npm install`
4. Start the backend server: `npm start` (from `Backend` folder)
5. Start the frontend: `npm run dev` (from `Frontend` folder)

## Environment Variables

- `PORT`: Backend server port
- `RELOAD_INTERVAL`: Interval for data reloads (check backend usage for units)
- `SERVER_URL`, `CLIENT_URL`: URLs for backend and frontend
- `MONGODB_PROD_URL`, `MONGODB_DEV_URL`: MongoDB connection strings
- `JWT_SECRET`: Secret for JWT authentication
- `GOOGLE_MAPS_API`: Google Maps API key
- `MAIL_USER`, `MAIL_PASS`: Email credentials for notifications
