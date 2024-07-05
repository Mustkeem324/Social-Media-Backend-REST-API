import User from '../models/User.js';

export const sendFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  try {
    const user = await User.findById(friendId);
    if (!user) {
      return res.status(404).send();
    }

    if (user.pendingRequests.includes(req.user._id)) {
      return res.status(400).send({ error: 'Friend request already sent!' });
    }

    user.pendingRequests.push(req.user._id);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const respondToFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const { response } = req.body; // response can be 'accept' or 'reject'

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send();
    }

    const requestIndex = user.pendingRequests.indexOf(friendId);
    if (requestIndex === -1) {
      return res.status(400).send({ error: 'No friend request found!' });
    }

    user.pendingRequests.splice(requestIndex, 1);
    if (response === 'accept') {
      user.friends.push(friendId);
      const friend = await User.findById(friendId);
      friend.friends.push(req.user._id);
      await friend.save();
    }
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'id name email');
    res.send(user.friends);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('pendingRequests', 'id name email');
    res.send(user.pendingRequests);
  } catch (error) {
    res.status(500).send(error);
  }
};
