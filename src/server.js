import express from 'express';
import { port } from './config';

const app = express();

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
