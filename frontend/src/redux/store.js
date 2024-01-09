import { createStore } from "redux";
import userReducer from "./userReducers";

const store = createStore(userReducer);

export default store;
