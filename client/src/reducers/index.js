// import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import posts from "./posts";

<<<<<<< Updated upstream
export default combineReducers({
	posts,
=======
// export default combineReducers({});

export const store = configureStore({
  reducer: {
    posts,
    auth,
  },
>>>>>>> Stashed changes
});
