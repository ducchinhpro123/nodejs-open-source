import express           from 'express';
import fs                from 'fs';
import bodyParser        from 'body-parser';
import path              from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/', (_req, res) => {
  res.render('loginForm.html', {message: "Please fill out the form."});
});


function getUserTxtCretical() {
  const filePath = path.join(__dirname, 'user.txt');

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.log(`Failed to read user.txt ${err.message}`);
        return reject("Failed to read user.txt");
      };
      let raw_username = data.split("\n")[0];
      let raw_password = data.split("\n")[1];
      const txt_username = raw_username.split(':')[1].trim();
      const txt_password = raw_password.split(':')[1].trim();
      return resolve({txt_username, txt_password});
    });
  });
};

router.post('/login', async (req, res) => {
  let message = '';
  const {username, password} = req.body;
  if (username != null && password != null) {
    try {
      const {txt_username, txt_password} = await getUserTxtCretical();
      if (username === txt_username && password === txt_password) {
        message = `Your username: ${txt_username}, password: ${txt_password}`;
      } else {
        message = 'Login Failed';
      };
    } catch (error) {
      console.error(error.message);
      message = error.message;
    };
  };

  res.render('loginForm.html', {message: message});
});

export default router;
