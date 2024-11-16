import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './config/db.js'
import contactRouter from './src/routers/contactRouter.js'
import cors from 'cors' 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contact', contactRouter);

const port = 3001;
app.listen(port, (req, res) => {
    console.log(`server is listening on ${port}`)
})

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working fine" })
})