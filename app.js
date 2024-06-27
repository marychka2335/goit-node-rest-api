import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { connect } from 'mongoose';
// import 'colors';
import express from 'express';
import contactsRouter from './routes/contactsRouter.js';
const { DB_HOST, PORT } = process.env;
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
try {
	await connect(DB_HOST)
	console.log('Database connection successful');
	app.listen(PORT, () => {
		console.log(
			`Server running. Use our API on port: ${PORT}`);
	});
} catch (err) {
	console.log(  'Could not connect to the mongodb database because of error',
      err.message);
	process.exit(1);
}


// import mongoose from 'mongoose';
// import 'dotenv/config';

// import contactsRouter from './routes/contactsRouter.js';

// const { DB_HOST, PORT = 3000 } = process.env;

// const app = express();

// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());

// app.use('/api/contacts', contactsRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Server error' } = err;
//   res.status(status).json({ message });
// });

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log('Database connection successful');
//     app.listen(PORT, () => {
//       console.log(`Server is running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.log(
//       'Could not connect to the mongodb database because of error',
//       error.message
//     );
//     process.exit(1);
//   });

// mongoose.set('debug', true);