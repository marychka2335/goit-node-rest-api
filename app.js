import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';

import contactsRouter from './routes/contactsRouter.js';
import usersRouter from "./routes/usersRouter.js";


const { DB_HOST, PORT = 3003 } = process.env;
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});


mongoose
  .connect('mongodb+srv://marychka2335:HiVidahSW1MKDm4S@cluster0.a95orri.mongodb.net/db-contacts', {
    usenewurlparser: true,
    useunifiedtopology: true,
  } )
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(
      'Could not connect to the mongodb database because of error',
      error.message
    );
    process.exit(1);
  });

mongoose.set('debug', true);