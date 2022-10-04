import React, { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { Container, Grow, Grid } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import { useDispatch } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(null);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);
	return (
		<>
			<Container maxWidth="lg">
				<Navbar />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/auth" exact element={<Auth />} />
				</Routes>
			</Container>
		</>
	);
};

export default App;
