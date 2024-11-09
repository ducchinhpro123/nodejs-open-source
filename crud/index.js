import express          from "express";
import connectToMongoDB from "./config/connectMongoDB.js";
import __dirname        from "./dirname.js";
import memberRouter     from "./route/memberRoutes.js";
import bodyParser       from "body-parser";

const port = 3000;
const app = express();

connectToMongoDB();

app.set("./views", __dirname);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/members', memberRouter);
app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Server are started at port ${port}`);
});
