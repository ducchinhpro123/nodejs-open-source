# Summary about this branch

`b4/views/searchVehicleNumber.html`

```html
<!DOCTYPE html>
<html>

<head>
  <title>W3.CSS Template</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <!--<link rel="stylesheet" href="/styles/style.css">-->
</head>
  <%- include('layouts/header.html') %>

  <%- include('layouts/searchForm.html') %>

  <%- include('layouts/footer.html') %>
</html>
```

`b4/views/layouts/searchForm.html`
```html
<div class="container">
  <form id="myForm">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Search for Vehicle VietNam number</label>
      <input type="text" name="province" class="form-control" id="province">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <div class="center">
    <% if (plate_no=='' ) { %>
      <p>I can't find any plate number with that <i> <%= province %> </i>.</p>
    <% } else { %>
        <b> <p>I found that result: <%= plate_no %> </p> </b>
     <% } %>
  </div>
</div>
```

`b4/routes/root.js`

```javascript
const dataMap = new Map(data.map(item => [item.city, item.plate_no]));

route.get('/search-vehicle-number/', (req, res) => {
  const q = req.query.province;
  //for (let i = 0; i < data.length; i++) {
  //  if (q == data[i]['city']) {
  //    result = data[i]['plate_no'];
  //    break;
  //  };
  //};
  //console.log(dataMap.get('Hậu Giang'));

  const result = dataMap.get(q) || '';
  res.render('searchVehicleNumber.html', {plate_no: result, province: q});
});
```
