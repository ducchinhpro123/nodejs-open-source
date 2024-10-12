import express           from 'express';
import morgan            from 'morgan';
import ejs               from 'ejs';  // Template engine

import router            from './router.js';

const app  = express();
const port = 3000;

app.use(morgan("common"));  // For better log
//app.set('./views', path.join(__dirname));  // root/views/
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static('./public'));  // Serving static files in folder public
//app.set('view engine', 'ejs');

app.use(router); 

app.listen(port);

