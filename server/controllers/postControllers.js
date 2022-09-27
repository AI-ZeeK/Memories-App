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

		const newPost = await PostMessage.create(post);
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
