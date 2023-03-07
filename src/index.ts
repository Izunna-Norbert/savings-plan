import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Database from './pkg/config/database.config';
import AuthRoute from './pkg/routes/auth.route';
import UserRoute from './pkg/routes/user.route';
import SavingsPlanRoute from './pkg/routes/savingsPlan.route';

const app: Express = express();

dotenv.config();

Database.initialize()
  .then(() => {
    console.info('Database connected');
  })
  .catch((error: any) => {
    console.error(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.use((error: any, req: Request, res: Response, next: any) => {
  res.status(500).json({ message: error.message, error });
});

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/savings', SavingsPlanRoute);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
