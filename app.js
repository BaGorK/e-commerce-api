import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found.js';
import GlobalErrorHandlerMiddleware from './middleware/error-handler.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  console.log(req.cookies);
  return res.send('e-commerce-api');
});

// Routes
app.use('/api/v1/auth', authRoute);

app.use(notFoundMiddleware);
app.use(GlobalErrorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.DB_LOCAL_URI);
  app.listen(PORT, () =>
    console.log(`DB connected && Server listening on port: ${PORT}...`)
  );
} catch (error) {
  console.error('📛', error);
  process.exit(1);
}
