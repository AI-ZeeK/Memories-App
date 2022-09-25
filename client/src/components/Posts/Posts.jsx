import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import "./styles.css";

const Posts = ({ setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	console.log(posts);
	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid className="container" container alignItems="stretch" spacing={3}>
			{posts.map((post) => (
				<Grid key={post.id} item xs={12}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
