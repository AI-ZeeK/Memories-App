import React, { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import { useDispatch } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { gapi } from "gapi-script";

const App = () => {
	const CLIENT_ID =
		"105747698090-4k3ferdhldk418tdjd236p7h64l3a1ku.apps.googleusercontent.com";
	gapi.load("client:auth2", () => {
		gapi.auth2.init({
			clientId: CLIENT_ID,
			plugin_name: "chat",
		});
	});
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
