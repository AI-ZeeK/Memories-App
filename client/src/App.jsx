import React, { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import { useDispatch } from "react-redux";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import "./App.css";

const App = () => {
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);
	return (
		<Container maxWidth="lg">
			<AppBar className="appBar" position="static" color="inherit">
				<Typography className="heading" variant="h2" align="center">
					Memories
				</Typography>
				<img className="image" src={memories} alt="memories" height="60" />
			</AppBar>
			<Grow in>
				<Grid
					container
					justify="space-between"
					alignItems="stretch"
					spacing={3}>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Grow>
		</Container>
	);
};

export default App;
