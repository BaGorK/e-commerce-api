import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found.js';
import GlobalErrorHandlerMiddleware from './middleware/error-handler.js';
import morgan from 'morgan';
import User from './models/userModel.js';
dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/test', (req, res) => {
  return res.send('e-commerce-api');
});

app.post('/testModel', async (req, res) => {
  const user = await User.create(req.body);

  return res.json({ user });
  // return res.send('e-commerce-api');
});

app.use(notFoundMiddleware);
app.use(GlobalErrorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.DB_LOCAL_URI);
  app.listen(PORT, () =>
    console.log(`DB connected && Server listening on port: ${PORT}...`)
  );
} catch (error) {
  console.error('📛', error);
  process.exit(1);
}
