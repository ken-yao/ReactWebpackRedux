import { combineReducers } from "redux";
import news from "./newsReducer";
import user from "./userReducer";

//联合多个reducer
export default combineReducers({
	news,
	user,
})
