import {
	ROOM_LIST_ADMIN_REQUEST,
	ROOM_LIST_ADMIN_SUCCESS,
	ROOM_LIST_ADMIN_AFTER_SUCCESS,
	ROOM_LIST_ADMIN_FAIL,
	ROOM_CREATE_ADMIN_REQUEST,
	ROOM_CREATE_ADMIN_SUCCESS,
	ROOM_CREATE_ADMIN_AFTER_SUCCESS,
	ROOM_CREATE_ADMIN_FAIL,
	ROOM_UPDATE_ADMIN_REQUEST,
	ROOM_UPDATE_ADMIN_SUCCESS,
	ROOM_UPDATE_ADMIN_AFTER_SUCCESS,
	ROOM_UPDATE_ADMIN_FAIL,
	ROOM_DELETE_ADMIN_REQUEST,
	ROOM_DELETE_ADMIN_SUCCESS,
	ROOM_DELETE_ADMIN_AFTER_SUCCESS,
	ROOM_DELETE_ADMIN_FAIL,
	ROOM_LIST_CUSTOMER_REQUEST,
	ROOM_LIST_CUSTOMER_SUCCESS,
	ROOM_LIST_CUSTOMER_AFTER_SUCCESS,
	ROOM_LIST_CUSTOMER_FAIL,
} from "../../constants/roomManagementConstants/roomConstant";

export const roomListAdminReducer = (state = { adminRooms: [] }, action) => {
	switch (action.type) {
		case ROOM_LIST_ADMIN_REQUEST:
			return { loading: true };
		case ROOM_LIST_ADMIN_SUCCESS:
			return { loading: false, adminRooms: action.payload, success: true };
		case ROOM_LIST_ADMIN_AFTER_SUCCESS:
			return { loading: false, adminRooms: action.payload, success: false };
		case ROOM_LIST_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const roomListCustomerReducer = (state = { customerRooms: [] }, action) => {
	switch (action.type) {
		case ROOM_LIST_CUSTOMER_REQUEST:
			return { loading: true };
		case ROOM_LIST_CUSTOMER_SUCCESS:
			return { loading: false, customerRooms: action.payload, success: true };
		case ROOM_LIST_CUSTOMER_AFTER_SUCCESS:
			return { loading: false, customerRooms: action.payload, success: false };
		case ROOM_LIST_CUSTOMER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const roomCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ROOM_CREATE_ADMIN_REQUEST:
			return { loading: true };
		case ROOM_CREATE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case ROOM_CREATE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case ROOM_CREATE_ADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const roomUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ROOM_UPDATE_ADMIN_REQUEST:
			return { loading: true };
		case ROOM_UPDATE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case ROOM_UPDATE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case ROOM_UPDATE_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const roomDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ROOM_DELETE_ADMIN_REQUEST:
			return { loading: true };
		case ROOM_DELETE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case ROOM_DELETE_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case ROOM_DELETE_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
