import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.css";
const Navbar = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logOut = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/");

		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;
		// JWT

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);
	return (
		<>
			<AppBar className="appBar" position="static" color="inherit">
				<div className="brandContainer">
					<Typography
						component={Link}
						to="/"
						className="heading"
						variant="h2"
						align="center">
						Memories
					</Typography>
					<img className="image" src={memories} alt="memories" height="60" />
				</div>
				<Toolbar className="toolbar">
					{user ? (
						<>
							<div className="profile">
								<Avatar
									className="purple"
									alt={user.result.name}
									src={user.result.imageUrl}>
									{user.result.name.charAt[0]}
								</Avatar>
								<Typography className="userName" variant="h6">
									{user.result.name}
								</Typography>
								<Button
									variant="contained"
									className="logout"
									color="secondary"
									onClick={logOut}>
									Logout
								</Button>
							</div>
						</>
					) : (
						<>
							<Button
								component={Link}
								to="/auth"
								variant="contained"
								color="primary">
								Sign In
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
