import { applyMiddleware, createStore } from "redux";
import reduxThunk  from "redux-thunk";
import user from "./reducer/user";

export default createStore(user,applyMiddleware(reduxThunk));