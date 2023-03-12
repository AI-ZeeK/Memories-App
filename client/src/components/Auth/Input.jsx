import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Input = ({
	half,
	name,
	label,
	autoFocus,
	type,
	handleChange,
	handleShowPassword,
}) => {
	return (
		<div xs={6} md={12} sm={half ? 6 : 12} className='input-box'>
			{/* <TextField
				className="my-space"
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					name === "password" && {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleShowPassword}>
									{type === "password" ? (
										<VisibilityIcon />
									) : (
										<VisibilityOffIcon />
									)}
								</IconButton>
							</InputAdornment>
						),
					}
				}
			/> */}
			<input
				className="my-space"
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
				label={label}
				placeholder={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					name === "password" && {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleShowPassword}>
									{type === "password" ? (
										<VisibilityIcon />
									) : (
										<VisibilityOffIcon />
									)}
								</IconButton>
							</InputAdornment>
						),
					}
				}
			/>
		</div>
	);
};

export default Input;
