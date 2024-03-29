import mongoose from "mongoose";
import PostMessage from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    const post = req.body;

    const newPost = await PostMessage.create({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "No Post with that ID" });
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: "No Post with that ID" });
    }
    const deletedPost = await PostMessage.findByIdAndRemove(_id);

    res.json({ message: "Post deleted Succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  LIKE POST

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) return res.json({ message: "Unathenticated" });

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No Post with that ID" });
    }
    const post = await PostMessage.findById(id);

    const index = post.likeCount.find((id) => id === userId);
    if (!index) {
      post.likeCount.push(userId);
    } else {
      post.likeCount = post.likeCount.filter((id) => id !== userId);
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
