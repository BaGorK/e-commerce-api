import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
} catch (error) {
  console.error('📛', error);
  process.exit(1);
}
