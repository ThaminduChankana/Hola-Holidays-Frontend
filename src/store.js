import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;

const customerInfoFromStorage = localStorage.getItem("customerInfo")
	? JSON.parse(localStorage.getItem("customerInfo"))
	: null;

const initialState = {
	admin_Login: { adminInfo: adminInfoFromStorage },
	customer_Login: { customerInfo: customerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
