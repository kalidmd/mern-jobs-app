require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

const userRouter = require('./routes/users');
const jobRouter = require('./routes/jobs');

// error handler middleware
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, 
            () => console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
}

start();