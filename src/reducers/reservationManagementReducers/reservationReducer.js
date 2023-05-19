import {
	RESERVATION_LIST_FAIL,
	RESERVATION_LIST_REQUEST,
	RESERVATION_LIST_SUCCESS,
	RESERVATION_LIST_AFTER_SUCCESS,
	ADMIN_RESERVATION_LIST_FAIL,
	ADMIN_RESERVATION_LIST_REQUEST,
	ADMIN_RESERVATION_LIST_SUCCESS,
	ADMIN_RESERVATION_LIST_AFTER_SUCCESS,
	RESERVATION_CREATE_FAIL,
	RESERVATION_CREATE_REQUEST,
	RESERVATION_CREATE_SUCCESS,
	RESERVATION_CREATE_AFTER_SUCCESS,
	RESERVATION_UPDATE_REQUEST,
	RESERVATION_UPDATE_SUCCESS,
	RESERVATION_UPDATE_AFTER_SUCCESS,
	RESERVATION_UPDATE_FAIL,
	RESERVATION_DELETE_FAIL,
	RESERVATION_DELETE_REQUEST,
	RESERVATION_DELETE_SUCCESS,
	RESERVATION_DELETE_AFTER_SUCCESS,
} from "../../constants/reservationManagementConstants/reservationConstant";

export const reservationListReducer = (state = { reservations: [] }, action) => {
	switch (action.type) {
		case RESERVATION_LIST_REQUEST:
			return { loading: true };
		case RESERVATION_LIST_SUCCESS:
			return { loading: false, reservations: action.payload, success: true };
		case RESERVATION_LIST_AFTER_SUCCESS:
			return { loading: false, reservations: action.payload, success: false };
		case RESERVATION_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const hotelReservationListReducer = (state = { hotelReservations: [] }, action) => {
	switch (action.type) {
		case ADMIN_RESERVATION_LIST_REQUEST:
			return { loading: true };
		case ADMIN_RESERVATION_LIST_SUCCESS:
			return { loading: false, hotelReservations: action.payload, success: true };
		case ADMIN_RESERVATION_LIST_AFTER_SUCCESS:
			return { loading: false, hotelReservations: action.payload, success: false };
		case ADMIN_RESERVATION_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const reservationCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case RESERVATION_CREATE_REQUEST:
			return { loading: true };
		case RESERVATION_CREATE_SUCCESS:
			return { loading: false, success: true };
		case RESERVATION_CREATE_AFTER_SUCCESS:
			return { loading: false, success: false };
		case RESERVATION_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const reservationUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case RESERVATION_UPDATE_REQUEST:
			return { loading: true };
		case RESERVATION_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case RESERVATION_UPDATE_AFTER_SUCCESS:
			return { loading: false, success: false };
		case RESERVATION_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const reservationDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case RESERVATION_DELETE_REQUEST:
			return { loading: true };
		case RESERVATION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case RESERVATION_DELETE_AFTER_SUCCESS:
			return { loading: false, success: false };
		case RESERVATION_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
