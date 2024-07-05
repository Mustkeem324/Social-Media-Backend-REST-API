import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  try {
    const post = new Post({ caption, imageUrl, owner: req.user._id });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('owner', 'id name email').populate('comments');
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id }).populate('owner', 'id name email').populate('comments');
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('owner', 'id name email').populate('comments');
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePost = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['caption', 'imageUrl'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const post = await Post.findOne({ _id: req.params.postId, owner: req.user._id });
    if (!post) {
      return res.status(404).send();
    }

    updates.forEach((update) => post[update] = req.body[update]);
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId, owner: req.user._id });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};
