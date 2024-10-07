import express from "express";

import { config } from "dotenv";
config();

import errorMiddleware from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use('/api/v1/user',userRoutes);

app.use('*',(req,res) => {
    res.status(404).send("OPPS!! 404 page not found")
})

app.use(errorMiddleware)

export {app}
