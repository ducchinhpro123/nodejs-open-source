import express from 'express';
import {createBlog, getAllBlogs, getBlog} from '../controller/blogController.js';

const router = express.Router();

router.post('/blogs', createBlog);

router.get('/blogs', async (_req, res) => {
  const blogs = await getAllBlogs();
  //console.log(blogs);
  res.render('index', {'blogs': blogs});
});

router.get('/blog/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await getBlog(id);
    if (!blog) {
      res.render('404', {"message": "Not found any blog"});
    };
    res.render('blog', {'blog': blog});
  } catch (err) {
      res.render('404', {"message": err.message});
  }
});

export default router;
