import {
	SITES_LIST_FOR_CUSTOMER_REQUEST,
	SITES_LIST_FOR_CUSTOMER_SUCCESS,
	SITES_LIST_FOR_CUSTOMER_AFTER_SUCCESS,
	SITES_LIST_FOR_CUSTOMER_FAIL,
	SITES_LIST_FOR_EACH_LOCATION_REQUEST,
	SITES_LIST_FOR_EACH_LOCATION_SUCCESS,
	SITES_LIST_FOR_EACH_LOCATION_AFTER_SUCCESS,
	SITES_LIST_FOR_EACH_LOCATION_FAIL,
	SITES_CREATE_REQUEST,
	SITES_CREATE_SUCCESS,
	SITES_CREATE_AFTER_SUCCESS,
	SITES_CREATE_FAIL,
	SITES_LIST_FOR_ADMIN_REQUEST,
	SITES_LIST_FOR_ADMIN_SUCCESS,
	SITES_LIST_FOR_ADMIN_AFTER_SUCCESS,
	SITES_LIST_FOR_ADMIN_FAIL,
	SITES_UPDATE_BY_ADMIN_REQUEST,
	SITES_UPDATE_BY_ADMIN_SUCCESS,
	SITES_UPDATE_BY_ADMIN_AFTER_SUCCESS,
	SITES_UPDATE_BY_ADMIN_FAIL,
	SITES_DELETE_BY_ADMIN_REQUEST,
	SITES_DELETE_BY_ADMIN_SUCCESS,
	SITES_DELETE_BY_ADMIN_AFTER_SUCCESS,
	SITES_DELETE_BY_ADMIN_FAIL,
} from "../../constants/siteManagementConstants/siteConstants";

export const customerSiteListReducer = (state = { sites: [] }, action) => {
	switch (action.type) {
		case SITES_LIST_FOR_CUSTOMER_REQUEST:
			return { loading: true };
		case SITES_LIST_FOR_CUSTOMER_SUCCESS:
			return { loading: false, sites: action.payload, success: true };
		case SITES_LIST_FOR_CUSTOMER_AFTER_SUCCESS:
			return { loading: false, sites: action.payload, success: false };
		case SITES_LIST_FOR_CUSTOMER_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const adminSiteListReducer = (state = { sites: [] }, action) => {
	switch (action.type) {
		case SITES_LIST_FOR_ADMIN_REQUEST:
			return { loading: true };
		case SITES_LIST_FOR_ADMIN_SUCCESS:
			return { loading: false, sites: action.payload, success: true };
		case SITES_LIST_FOR_ADMIN_AFTER_SUCCESS:
			return { loading: false, sites: action.payload, success: false };
		case SITES_LIST_FOR_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const locationSiteListReducer = (state = { sites: [] }, action) => {
	switch (action.type) {
		case SITES_LIST_FOR_EACH_LOCATION_REQUEST:
			return { loading: true };
		case SITES_LIST_FOR_EACH_LOCATION_SUCCESS:
			return { loading: false, sites: action.payload, success: true };
		case SITES_LIST_FOR_EACH_LOCATION_AFTER_SUCCESS:
			return { loading: false, sites: action.payload, success: false };
		case SITES_LIST_FOR_EACH_LOCATION_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const siteCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SITES_CREATE_REQUEST:
			return { loading: true };
		case SITES_CREATE_SUCCESS:
			return { loading: false, success: true };
		case SITES_CREATE_AFTER_SUCCESS:
			return { loading: false, success: false };
		case SITES_CREATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const siteUpdateByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case SITES_UPDATE_BY_ADMIN_REQUEST:
			return { loading: true };
		case SITES_UPDATE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case SITES_UPDATE_BY_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case SITES_UPDATE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const siteDeleteByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case SITES_DELETE_BY_ADMIN_REQUEST:
			return { loading: true };
		case SITES_DELETE_BY_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case SITES_DELETE_BY_ADMIN_AFTER_SUCCESS:
			return { loading: false, success: false };
		case SITES_DELETE_BY_ADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
