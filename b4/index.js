import express           from 'express';
import morgan            from 'morgan';
import path              from 'path';
import ejs               from 'ejs';  // Template engine
import { fileURLToPath } from 'url';

import routeHome         from './routes/home.js';
import routeJob          from './routes/job.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(morgan("common"));  // For better log
app.set('./views', path.join(__dirname));  // root/views/
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('./public'));  // Serving static files in folder public
//app.set('view engine', 'ejs');

app.use(routeHome); 
app.use(routeJob); 

app.listen(port);

