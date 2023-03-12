import { AUTH } from "../constants/actionTypes";
import { signupAPi, signinApi } from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
	try {
		// Log in the user

		const { data } = await signinApi(formData);

		console.log("Sign in");
		dispatch({ type: AUTH, data });
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
export const signup = (formData, navigate) => async (dispatch) => {
	try {
		// sign up the user
		const { data } = await signupAPi(formData);

		console.log("Sign up" , data);
		dispatch({ type: AUTH, data });

		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
