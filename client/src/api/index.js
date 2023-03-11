import axios from "axios";

// const API = axios.create({ baseURL: `http://localhost:5000` });
const API = axios.create({ baseURL: `https://memories-repg.onrender.com` });
const url = "/posts";

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = async (id, updatedPost) =>
	await API.patch(`/posts/${id}`, updatedPost);
export const deletePost = async (id) => await API.delete(`${url}/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likepost`);

export const signinApi = (formData) => API.post("/users/signin", formData);
export const signupAPi =async (formData) => await API.post("/users/signup", formData);
