import express from 'express';
import morgan from 'morgan';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import jobExperience from "./jobExperience.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = express();
const port = 3000;

server.use(morgan("common"));
server.set('views', path.join(__dirname));
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');

server.get('/', (_req, res) => {
  res.render('index.html', { jobExperience: jobExperience });
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

