import User from '../models/User.js';

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -tokens');
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserDetails = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'gender', 'avatar'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -tokens');
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
