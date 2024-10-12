# Summary about this branch

`bt1/views/loginForm.html`

```html
<form action="/login" method=POST>
  <div class="mb-3">
    <label for="username" class="form-label"
      >Username</label
    >
    <input
      type="text"
      class="form-control"
      id="username"
      name="username"
      aria-describedby="emailHelp"
    />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input
      type="password"
      class="form-control"
      id="exampleInputPassword1"
      name="password"
    />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

`bt1/index.js`
```javascript
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

```

`bt1/router.js`

```javascript
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
```
