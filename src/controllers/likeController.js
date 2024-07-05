import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const toggleLike = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // type can be 'post' or 'comment'

  try {
    let doc;
    if (type === 'post') {
      doc = await Post.findById(id);
    } else if (type === 'comment') {
      doc = await Comment.findById(id);
    } else {
      return res.status(400).send({ error: 'Invalid type!' });
    }

    if (!doc) {
      return res.status(404).send();
    }

    const isLiked = doc.likes.includes(req.user._id);
    if (isLiked) {
      doc.likes = doc.likes.filter((like) => !like.equals(req.user._id));
    } else {
      doc.likes.push(req.user._id);
    }
    await doc.save();

    res.send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getLikes = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // type can be 'post' or 'comment'

  try {
    let doc;
    if (type === 'post') {
      doc = await Post.findById(id).populate('likes', 'id name email');
    } else if (type === 'comment') {
      doc = await Comment.findById(id).populate('likes', 'id name email');
    } else {
      return res.status(400).send({ error: 'Invalid type!' });
    }

    if (!doc) {
      return res.status(404).send();
    }

    res.send(doc.likes);
  } catch (error) {
    res.status(400).send(error);
  }
};
