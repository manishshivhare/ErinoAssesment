# Contact Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing contacts with complete CRUD operations.

## Features

✨ Create new contacts  
📱 View all contacts  
📝 Update contact information  
❌ Delete contacts  
🔍 Search contacts  
📱 Responsive design  

## Tech Stack

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend library
- Node.js - Runtime environment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/contact-management.git
cd contact-management
```

2. Install Server Dependencies
```bash
cd server
npm install
```

3. Install Client Dependencies
```bash
cd ../client
npm install
```

4. Create .env file in server directory
```
MONGODB_URI=mongodb://localhost:27017/contacts
PORT=5000
```

### Running the Application

1. Start MongoDB
```bash
mongod
```

2. Start Server (in server directory)
```bash
npm start
```

3. Start Client (in client directory)
```bash
npm start
```

The application will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/contacts | Get all contacts |
| POST   | /api/contacts | Create contact |
| PUT    | /api/contacts/:id | Update contact |
| DELETE | /api/contacts/:id | Delete contact |

## Data Model

```javascript
{
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default :Date.now
  }
}
```

## Project Structure

```
contact-management/
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── contactController.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## API Usage Examples

### Create Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  
}
```

### Update Contact
```bash
PUT /api/contacts/:id
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "1234567890",
  
}
```

## Error Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
