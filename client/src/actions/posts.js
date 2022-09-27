import {
	updatePost as updateApi,
	createPost as createPostApi,
	fetchPosts,
	deletePost as deletePostApi,
} from "../api";

// action creators
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await fetchPosts();

		dispatch({ type: "FETCH_ALL", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await createPostApi(post);

		dispatch({ type: "CREATE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await updateApi(id, post);

		dispatch({ type: "UPDATE", payload: data });
	} catch (error) {
		console.log(error);
	}
};
// Delete Post
export const deletePost = (id) => async (dispatch) => {
	try {
		await deletePostApi(id);

		dispatch({ type: "DELETE", payload: id });
	} catch (error) {
		console.log(error);
	}
};
