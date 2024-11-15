import express from 'express'
import dotenv from "dotenv"
const app = express();
import { connectDB } from './config/db.js'
import contactRouter from './src/routers/contactRouter.js'

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/contact', contactRouter);

const port = 3001;
app.listen(port, (req, res) => {
    console.log(`server is listening on ${port}`)
})

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working fine" })
})