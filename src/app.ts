import { globalCatch } from '@middlewares/global-catch';
import cors from 'cors';
import express from 'express';
import router from 'routes';
import { env } from './config';

const app = express();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_DOMAIN, credentials: true }));

app.use('/api', router);

app.use(globalCatch);

export default app;
