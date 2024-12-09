# HolidaysDotCom

A comprehensive hotel booking application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to browse, book, and manage hotel reservations while providing an easy-to-use interface for both customers and administrators.  

## Features  

- User authentication and authorization (JWT-based).  
- Hotel listing with search and filter options.  
- Secure booking system.  
- Image management using Cloudinary.  
- Admin panel for managing hotels, bookings, and users.  
- Responsive design for optimal user experience on all devices.  

## Tech Stack  

- **Frontend**: React.js (with Vite), Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Cloud Services**: Cloudinary (for image hosting)  

---

## Setup Instructions  

### Prerequisites  

Ensure you have the following installed on your system:  

- Node.js (v14 or higher)  
- MongoDB  
- A Cloudinary account  

---

### Backend Setup  

1. Clone the repository and navigate to the backend folder:  

```bash  
git clone https://github.com/BugReportOnWeb/holidays-dot-com.git
cd backend
```

2. Install dependencies:

```bash  
npm install
```

3. Create a .env file in the backend directory and configure the following variables:

```env
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>  
JWT_SECRET_KEY=<your-jwt-secret-key>  
FRONTEND_URL=<frontend-url>  

# Cloudinary Variables  
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>  
CLOUDINARY_API_KEY=<your-cloudinary-api-key>  
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

4. Start the server:

```bash
npm run dev
```

---

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```
  
3. Create a .env file in the frontend directory and configure the following variable:

```env
VITE_API_BASE_URL=<your-backend-api-base-url>  
```

4. Start the development server:

```bash
npm run dev
```

---

### Running the Application

Access the frontend at http://localhost:5173 (or the port configured by Vite).
Access the backend API at http://localhost:3000 (or the port specified in the backend setup).
