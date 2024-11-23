import express            from "express";
import bodyParser         from "body-parser";

import  connectMongoDB    from "./config/connectMongoDB.js";
import __dirname          from "./dirname.js";
import { bookingRouter }  from "./routes/booking_route.js";

import session            from "express-session";
import flash              from "connect-flash";

const port = 3000;
const app = express();

connectMongoDB();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.set("./views", __dirname);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/', router);
app.use('/booking', bookingRouter);
app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Server are started at port ${port}`);
});
