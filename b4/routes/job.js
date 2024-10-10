import express from 'express';
import jobExperience     from "../jobExperience.js";

const route = express.Router();

route.get('/job', (_req, res) => {
  res.render('job.html', { jobExperience: jobExperience });
});

export default route;
