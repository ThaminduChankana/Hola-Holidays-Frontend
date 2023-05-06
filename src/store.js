import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	adminLoginReducer,
	adminRegisterReducer,
	adminViewReducer,
	adminUpdateReducer,
} from "./reducers/userManagementReducers/adminReducers";

import {
	customerLoginReducer,
	customerRegisterReducer,
	customerViewReducer,
	customerUpdateReducer,
	customerDeleteReducer,
	customerListReducer,
	customerViewByIdReducer,
	customerUpdateByIdReducer,
	customerDeleteByIdReducer,
} from "./reducers/userManagementReducers/customerReducers";

import {
	customerSiteListReducer,
	adminSiteListReducer,
	locationSiteListReducer,
	siteCreateReducer,
	siteUpdateByAdminReducer,
	siteDeleteByAdminReducer,
} from "./reducers/siteManagementReducers/siteReducers";

import {
	GuideAddReducer,
	GuideViewListReducer,
	GuideUpdateReducer,
	GuideDeleteReducer,
	CustomerGuideViewListReducer,
} from "./reducers/TourGuideReducers/TourGuideReducers";

const reducer = combineReducers({
	admin_Login: adminLoginReducer,
	adminRegistration: adminRegisterReducer,
	adminView: adminViewReducer,
	adminUpdate: adminUpdateReducer,
	customer_Login: customerLoginReducer,
	customerRegistration: customerRegisterReducer,
	customerView: customerViewReducer,
	customerUpdate: customerUpdateReducer,
	customerList: customerListReducer,
	customerDelete: customerDeleteReducer,
	customerViewById: customerViewByIdReducer,
	customerUpdateById: customerUpdateByIdReducer,
	customerDeleteById: customerDeleteByIdReducer,

	customerSiteList: customerSiteListReducer,
	adminSiteList: adminSiteListReducer,
	locationSiteList: locationSiteListReducer,
	siteCreate: siteCreateReducer,
	siteUpdateByAdmin: siteUpdateByAdminReducer,
	siteDeleteByAdmin: siteDeleteByAdminReducer,

	Guide_Details_Create: GuideAddReducer,
	list_Guide: GuideViewListReducer,
	Guide_Update: GuideUpdateReducer,
	Guide_Delete: GuideDeleteReducer,
	customer_list_Guide: CustomerGuideViewListReducer,
});

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
