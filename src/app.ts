import cors from 'cors';
import http from 'http';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import router from './routes';
import 'dotenv/config';
import { apiVersion, client } from './utils';

const app: Application = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/api/${apiVersion()}`, router());
const server = http.createServer(app);
const port = process.env['PORT'] || '3000';
server.listen(port, async () => {
  try {
    await client.connect();
    console.log(`Server running on http://localhost:${port} ✨`);
    console.log(
      `Default api route is http://localhost:${port}/api/${apiVersion()} 🌏`
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
});
process.on('SIGINT', () => {
  process.exit();
});

export default app;
