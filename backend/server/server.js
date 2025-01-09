require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require("./utils/db");
const authRouter = require("./router/auth-router");
const commentRouter = require('./router/commentRouter');
//const replyRouter = require('./router/replyRouter');
const feedbackRouter = require('./router/feedbackRouter');
const errorMiddleware = require("./middlewares/error-middleware");
const notificationRouter = require('./router/notificationRouter');
const alertRouter = require('./router/alertRouter');
const wishlistRouter = require('./router/wishlistRouter');
const cartRouter = require('./router/cartRouter');
const billingRouter = require('./router/billingRouter');
const reviewRouter = require('./router/reviewRouter');
const recommendRouter = require('./router/recommendRouter');
const ratingRouter = require('./router/ratingRouter');
const orderRouter = require('./router/orderRouter');
const memberRouter = require('./router/memberRouter');
const app = express();
const server = http.createServer(app); // Create the server for both HTTP and WebSocket connections

// Middleware for CORS
const corsOptions = {
  origin: "http://localhost:5173", // Adjust according to the frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
app.use(cors(corsOptions));

// Middleware for parsing JSON and static files
app.use(express.json());
app.use(express.static('dist'));

// Connect routes for authentication and blogs
app.use("/api/auth", authRouter);

app.use('/api/comments', commentRouter);
//app.use('/api/replies', replyRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/alerts', alertRouter);
app.use('/api/wishes', wishlistRouter);
app.use('/api/cart', cartRouter);
app.use('/api/billing_details', billingRouter);
app.use('/api/review', reviewRouter);
app.use('/api/recommend', recommendRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/order', orderRouter);
app.use('/api/member', memberRouter);

// Middleware for handling errors
app.use(errorMiddleware);

// Database connection and starting the server
const port = 5000;
connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});


