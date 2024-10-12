import express       from 'express';
import jobExperience from '../jobExperience.js';
import data          from '../vehicleJson.js';

const route = express.Router();

route.get('/', (_req, res) => {
  res.render('index');
});

route.get('/cv/:id', (req, res) => {
  console.log(req.query);
  //console.log(req.params.id);
  res.render('cv.html', { jobExperience: jobExperience });
});


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

export default route;
