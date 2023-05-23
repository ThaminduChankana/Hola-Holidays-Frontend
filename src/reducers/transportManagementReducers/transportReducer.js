import {
	TRANSPORT_LIST_FOR_CUSTOMER_REQUEST,
	TRANSPORT_LIST_FOR_CUSTOMER_SUCCESS,
	TRANSPORT_LIST_FOR_CUSTOMER_AFTER_SUCCESS,
	TRANSPORT_LIST_FOR_CUSTOMER_FAIL,
	TRANSPORT_LIST_FOR_ADMIN_REQUEST,
	TRANSPORT_LIST_FOR_ADMIN_SUCCESS,
	TRANSPORT_LIST_FOR_ADMIN_AFTER_SUCCESS,
	TRANSPORT_LIST_FOR_ADMIN_FAIL,
	TRANSPORT_CREATE_REQUEST,
	TRANSPORT_CREATE_SUCCESS,
	TRANSPORT_CREATE_AFTER_SUCCESS,
	TRANSPORT_CREATE_FAIL,
	TRANSPORT_UPDATE_BY_ADMIN_REQUEST,
	TRANSPORT_UPDATE_BY_ADMIN_SUCCESS,
	TRANSPORT_UPDATE_BY_ADMIN_AFTER_SUCCESS,
	TRANSPORT_UPDATE_BY_ADMIN_FAIL,
	TRANSPORT_DELETE_BY_ADMIN_REQUEST,
	TRANSPORT_DELETE_BY_ADMIN_SUCCESS,
	TRANSPORT_DELETE_BY_ADMIN_AFTER_SUCCESS,
	TRANSPORT_DELETE_BY_ADMIN_FAIL,
} from "../../constants/transportManagementConstants/transportConstant";

export const customerTransportListReducer = (state = { transport: [] }, action) => {
	switch (action.type) {
		case TRANSPORT_LIST_FOR_CUSTOMER_REQUEST:
			return { loading: true };
		case TRANSPORT_LIST_FOR_CUSTOMER_SUCCESS:
			return { loading: false, transport: action.payload, success: true };
		case TRANSPORT_LIST_FOR_CUSTOMER_AFTER_SUCCESS:
			return { loading: false, transport: action.payload, success: false };
		case TRANSPORT_LIST_FOR_CUSTOMER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const adminTransportListReducer = (state = { transport: [] }, action) => {
	switch (action.type) {
		case TRANSPORT_LIST_FOR_ADMIN_REQUEST:
			return { loading: true };
		case TRANSPORT_LIST_FOR_ADMIN_SUCCESS:
			return { loading: false, transport: action.payload, success: true };
		case TRANSPORT_LIST_FOR_ADMIN_AFTER_SUCCESS:
			return { loading: false, transport: action.payload, success: false };
		case TRANSPORT_LIST_FOR_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const transportCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case TRANSPORT_CREATE_REQUEST:
			return { loading: true };
		case TRANSPORT_CREATE_SUCCESS:
			return { loading: false, success: true };
		case TRANSPORT_CREATE_AFTER_SUCCESS:
			return { loading: false, success: false };
		case TRANSPORT_CREATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const transportUpdateByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case TRANSPORT_UPDATE_BY_ADMIN_REQUEST:
			return { loading: true };
		case TRANSPORT_UPDATE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case TRANSPORT_UPDATE_BY_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case TRANSPORT_UPDATE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const transportDeleteByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case TRANSPORT_DELETE_BY_ADMIN_REQUEST:
			return { loading: true };
		case TRANSPORT_DELETE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case TRANSPORT_DELETE_BY_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case TRANSPORT_DELETE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
