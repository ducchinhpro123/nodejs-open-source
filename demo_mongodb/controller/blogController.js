import Blog from "../model/blogScheme.js";

export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const blog = await newBlog.save();
    res.status(201).json(blog);
    console.log("Written successfully!");
    res.redirect("/blogs");
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const getBlog = async (id) => {
  try {
    const blog = await Blog.findById(id);
    return blog;
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const getAllBlogs = async (_req, res) => {
  try {
    const blogs = Blog.find();
    return blogs;
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

