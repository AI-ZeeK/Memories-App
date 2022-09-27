import axios from "axios";

const url = "/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = async (id, updatedPost) =>
	await axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = async (id) => await axios.delete(`${url}/${id}`);
