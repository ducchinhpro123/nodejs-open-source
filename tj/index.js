import express           from 'express';
import bodyParser        from 'body-parser';
import path              from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {setupWebsocket} from './config/websocket.js';

import { router }         from './route/router.js';
import { connectMongoDB } from './config/config.js';

import cookieSession from 'cookie-session'

const PORT = 3001;

const app = express();
app.use(cors());

// -------------- Configure socket --------------
setupWebsocket();
// -------------- End Configure socket --------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('./views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(cookieSession({
    httpOnly: true,
    keys: ["VMGLegKzIcss91EmxXmeiib6FmSkMcTBxqNcFAKTUvKb+GQZUQsCLaWvNIdpWQoe rug2QAyDX2Qs9l+aj3+rxQ=="],
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use('/public/images/', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static('./public'));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

connectMongoDB();
