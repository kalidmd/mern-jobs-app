require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
// extra security packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

const userRouter = require('./routes/users');
const jobRouter = require('./routes/jobs');

// authentication middleware
const authenticateUser = require('./middlewares/authentication');

// error handler middleware
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

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