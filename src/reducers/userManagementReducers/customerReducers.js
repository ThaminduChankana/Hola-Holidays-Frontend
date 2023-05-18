import {
	CUSTOMER_LOGIN_FAIL,
	CUSTOMER_LOGIN_REQUEST,
	CUSTOMER_LOGIN_SUCCESS,
	CUSTOMER_LOGIN_AFTER_SUCCESS,
	CUSTOMER_LOGOUT,
	CUSTOMER_REGISTER_FAIL,
	CUSTOMER_REGISTER_REQUEST,
	CUSTOMER_REGISTER_SUCCESS,
	CUSTOMER_REGISTER_AFTER_SUCCESS,
	CUSTOMER_VIEW_FAIL,
	CUSTOMER_VIEW_REQUEST,
	CUSTOMER_VIEW_SUCCESS,
	CUSTOMER_VIEW_AFTER_SUCCESS,
	CUSTOMER_UPDATE_FAIL,
	CUSTOMER_UPDATE_REQUEST,
	CUSTOMER_UPDATE_SUCCESS,
	CUSTOMER_UPDATE_AFTER_SUCCESS,
	CUSTOMER_DELETE_FAIL,
	CUSTOMER_DELETE_REQUEST,
	CUSTOMER_DELETE_SUCCESS,
	CUSTOMER_DELETE_AFTER_SUCCESS,
	CUSTOMER_LIST_FAIL,
	CUSTOMER_LIST_REQUEST,
	CUSTOMER_LIST_SUCCESS,
	CUSTOMER_LIST_AFTER_SUCCESS,
	CUSTOMER_VIEW_BY_ID_FAIL,
	CUSTOMER_VIEW_BY_ID_REQUEST,
	CUSTOMER_VIEW_BY_ID_SUCCESS,
	CUSTOMER_VIEW_BY_ID_AFTER_SUCCESS,
	CUSTOMER_UPDATE_BY_ID_FAIL,
	CUSTOMER_UPDATE_BY_ID_REQUEST,
	CUSTOMER_UPDATE_BY_ID_SUCCESS,
	CUSTOMER_UPDATE_BY_ID_AFTER_SUCCESS,
	CUSTOMER_DELETE_BY_ID_FAIL,
	CUSTOMER_DELETE_BY_ID_REQUEST,
	CUSTOMER_DELETE_BY_ID_SUCCESS,
	CUSTOMER_DELETE_BY_ID_AFTER_SUCCESS,
} from "../../constants/userManagementConstants/customerConstants";

export const customerLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_LOGIN_REQUEST:
			return { loading: true };
		case CUSTOMER_LOGIN_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_LOGIN_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_LOGIN_FAIL:
			return { loading: false, error: action.payload, success: false };
		case CUSTOMER_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const customerRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_REGISTER_REQUEST:
			return { loading: true };
		case CUSTOMER_REGISTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_REGISTER_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_REGISTER_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerViewReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_VIEW_REQUEST:
			return { loading: true };
		case CUSTOMER_VIEW_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_VIEW_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_VIEW_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_UPDATE_REQUEST:
			return { loading: true };
		case CUSTOMER_UPDATE_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_UPDATE_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_DELETE_REQUEST:
			return { loading: true };
		case CUSTOMER_DELETE_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_DELETE_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerListReducer = (state = { customers: [] }, action) => {
	switch (action.type) {
		case CUSTOMER_LIST_REQUEST:
			return { loading: true };
		case CUSTOMER_LIST_SUCCESS:
			return { loading: false, customers: action.payload, success: true };
		case CUSTOMER_LIST_AFTER_SUCCESS:
			return { loading: false, customers: action.payload, success: false };
		case CUSTOMER_LIST_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case CUSTOMER_VIEW_BY_ID_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_VIEW_BY_ID_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case CUSTOMER_UPDATE_BY_ID_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_UPDATE_BY_ID_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const customerDeleteByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_DELETE_BY_ID_REQUEST:
			return { loading: true };
		case CUSTOMER_DELETE_BY_ID_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: true };
		case CUSTOMER_DELETE_BY_ID_AFTER_SUCCESS:
			return { loading: false, customerInfo: action.payload, success: false };
		case CUSTOMER_DELETE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
