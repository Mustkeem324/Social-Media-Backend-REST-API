import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const addComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  try {
    const comment = new Comment({ text, owner: req.user._id, post: postId });
    await comment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ post: postId }).populate('owner', 'id name email');
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateComment = async (req, res) => {
  const { text } = req.body;
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOne({ _id: commentId, owner: req.user._id });
    if (!comment) {
      return res.status(404).send();
    }
    comment.text = text;
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOneAndDelete({ _id: commentId, owner: req.user._id });
    if (!comment) {
      return res.status(404).send();
    }
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};
