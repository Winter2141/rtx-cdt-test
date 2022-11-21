import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import cors from 'cors';

// routes 
import routes from './routes/index.js';

const port = config.service.port || 3000;

// 1. Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:8080'
  ]
}))

// 2. Require our routes into the application.
app.use('/api', routes);

// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));

const errorHandler = (err, req, res, next) => {
  if(res.headersSent) {
    return next(err);
  }
  res.status(500).render('error', { error: err });
}

app.use(errorHandler);

// 3. Server listen to port
app.listen(port, () => console.log(`Server running at port ${port}`));

export default app;