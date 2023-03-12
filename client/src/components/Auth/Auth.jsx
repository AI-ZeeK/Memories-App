import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import "./styles.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const state = null;
	const CLIENT_ID =
		"105747698090-4k3ferdhldk418tdjd236p7h64l3a1ku.apps.googleusercontent.com";

	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const navigate = useNavigate();
	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};
	const dispatch = useDispatch();

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: "AUTH", data: { result, token } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		console.log(error);

		console.log("Google Sign in was Unsuccessful. try again later");
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		setShowPassword(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	return (
		<Container component="main" maxWidth="xs" className='card-block'>
			<Paper className="paper" elevation={3}>
				<Avatar className="avatar">
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<form action="" onSubmit={handleSubmit} className="form">
					<div className="my-form">
						{isSignUp && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half></Input>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									autoFocus
									half></Input>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"></Input>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}></Input>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmit}>
						{isSignUp ? "Sign Up " : "Sign In"}
					</Button>
					<GoogleLogin
						clientId={CLIENT_ID}
						render={(renderProps) => (
							<Button
								className="googleButton"
								variant="contained"
								color="secondary"
								fullWidth
								onClick={renderProps.onClick}
								startIcon={<GoogleIcon />}>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
						// isSignedIn={true}
					/>

					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already have an account? Sign  In"
									: "Don't have an account? Sign up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
