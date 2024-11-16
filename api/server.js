import express from 'express'; 
import dotenv from 'dotenv'; 
import { connectDB } from './config/db.js'; 
import contactRouter from './src/routers/contactRouter.js'; 
import cors from 'cors'; 

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Middleware to parse URL-encoded data (e.g., form data)
app.use(express.urlencoded({ extended: true }));

// Middleware to enable Cross-Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Routes for contact-related actions
app.use('/api/contact', contactRouter);

// Root route to check if the API is up and running
app.get('/', (req, res) => {
    // Respond with a success message and HTTP status 200
    res.status(200).json({ message: "API is working fine" });
});

// Set the port from environment variables or default to 3001
const port = process.env.PORT || 3001;

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
