import {
	HOTEL_LIST_ADMIN_REQUEST,
	HOTEL_LIST_ADMIN_SUCCESS,
	HOTEL_LIST_ADMIN_AFTER_SUCCESS,
	HOTEL_LIST_ADMIN_FAIL,
	HOTEL_CREATE_ADMIN_REQUEST,
	HOTEL_CREATE_ADMIN_SUCCESS,
	HOTEL_CREATE_ADMIN_AFTER_SUCCESS,
	HOTEL_CREATE_ADMIN_FAIL,
	HOTEL_UPDATE_ADMIN_REQUEST,
	HOTEL_UPDATE_ADMIN_SUCCESS,
	HOTEL_UPDATE_ADMIN_AFTER_SUCCESS,
	HOTEL_UPDATE_ADMIN_FAIL,
	HOTEL_DELETE_ADMIN_REQUEST,
	HOTEL_DELETE_ADMIN_SUCCESS,
	HOTEL_DELETE_ADMIN_AFTER_SUCCESS,
	HOTEL_DELETE_ADMIN_FAIL,
	HOTEL_LIST_CUSTOMER_REQUEST,
	HOTEL_LIST_CUSTOMER_SUCCESS,
	HOTEL_LIST_CUSTOMER_AFTER_SUCCESS,
	HOTEL_LIST_CUSTOMER_FAIL,
} from "../../constants/hotelManagementConstants/hotelConstant";

export const hotelListAdminReducer = (state = { adminHotels: [] }, action) => {
	switch (action.type) {
		case HOTEL_LIST_ADMIN_REQUEST:
			return { loading: true };
		case HOTEL_LIST_ADMIN_SUCCESS:
			return { loading: false, adminHotels: action.payload, success: true };
		case HOTEL_LIST_ADMIN_AFTER_SUCCESS:
			return { loading: false, adminHotels: action.payload, success: false };
		case HOTEL_LIST_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const hotelListCustomerReducer = (state = { customerHotels: [] }, action) => {
	switch (action.type) {
		case HOTEL_LIST_CUSTOMER_REQUEST:
			return { loading: true };
		case HOTEL_LIST_CUSTOMER_SUCCESS:
			return { loading: false, customerHotels: action.payload, success: true };
		case HOTEL_LIST_CUSTOMER_AFTER_SUCCESS:
			return { loading: false, customerHotels: action.payload, success: false };
		case HOTEL_LIST_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const hotelCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case HOTEL_CREATE_ADMIN_REQUEST:
			return { loading: true };
		case HOTEL_CREATE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case HOTEL_CREATE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case HOTEL_CREATE_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const hotelUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case HOTEL_UPDATE_ADMIN_REQUEST:
			return { loading: true };
		case HOTEL_UPDATE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case HOTEL_UPDATE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case HOTEL_UPDATE_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const hotelDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case HOTEL_DELETE_ADMIN_REQUEST:
			return { loading: true };
		case HOTEL_DELETE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case HOTEL_DELETE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case HOTEL_DELETE_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
