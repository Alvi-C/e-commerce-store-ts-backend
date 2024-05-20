import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes/allRoutes';

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use(router);

export default app;
