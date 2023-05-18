import {
	SITES_LIST_FOR_CUSTOMER_REQUEST,
	SITES_LIST_FOR_CUSTOMER_SUCCESS,
	SITES_LIST_FOR_CUSTOMER_FAIL,
	SITES_LIST_FOR_EACH_LOCATION_REQUEST,
	SITES_LIST_FOR_EACH_LOCATION_SUCCESS,
	SITES_LIST_FOR_EACH_LOCATION_FAIL,
	SITES_CREATE_REQUEST,
	SITES_CREATE_SUCCESS,
	SITES_CREATE_FAIL,
	SITES_LIST_FOR_ADMIN_REQUEST,
	SITES_LIST_FOR_ADMIN_SUCCESS,
	SITES_LIST_FOR_ADMIN_FAIL,
	SITES_UPDATE_BY_ADMIN_REQUEST,
	SITES_UPDATE_BY_ADMIN_SUCCESS,
	SITES_UPDATE_BY_ADMIN_FAIL,
	SITES_DELETE_BY_ADMIN_REQUEST,
	SITES_DELETE_BY_ADMIN_SUCCESS,
	SITES_DELETE_BY_ADMIN_FAIL,
} from "../../constants/siteManagementConstants/siteConstants";
import axios from "axios";
import Swal from "sweetalert2";
import { API_ENDPOINT } from "../../config";

export function authHeaderForAdmin() {
	let admin = JSON.parse(localStorage.getItem("adminInfo"));

	if (admin && admin.token) {
		return { Authorization: `Bearer ${admin.token}` };
	} else {
		return {};
	}
}

export const sitesListForCustomer = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SITES_LIST_FOR_CUSTOMER_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/sites/`);

		dispatch({
			type: SITES_LIST_FOR_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SITES_LIST_FOR_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const sitesListForAdmin = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SITES_LIST_FOR_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/sites/admin/get`, config);

		dispatch({
			type: SITES_LIST_FOR_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SITES_LIST_FOR_ADMIN_FAIL,
			payload: message,
		});
	}
};

export const sitesListForEachLocation = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SITES_LIST_FOR_EACH_LOCATION_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/sites/location/${id}`);

		dispatch({
			type: SITES_LIST_FOR_EACH_LOCATION_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SITES_LIST_FOR_EACH_LOCATION_FAIL,
			payload: message,
		});
	}
};

export const createSite =
	(
		siteName,
		country,
		province,
		siteLocation,
		postalCode,
		picURL,
		description,
		recommendations,
		specialEvents,
		specialInstructions,
		moreInfoURL
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: SITES_CREATE_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`${API_ENDPOINT}/sites/admin/add`,
				{
					siteName,
					country,
					province,
					siteLocation,
					postalCode,
					picURL,
					description,
					recommendations,
					specialEvents,
					specialInstructions,
					moreInfoURL,
				},
				config
			);

			dispatch({
				type: SITES_CREATE_SUCCESS,
				payload: data,
			});
			Swal.fire({
				title: "Success !!!",
				text: "Site Creation Successful.",
				icon: "success",
				timer: 2000,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: SITES_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateSiteByAdmin =
	(
		id,
		siteName,
		country,
		province,
		siteLocation,
		postalCode,
		picURL,
		description,
		recommendations,
		specialEvents,
		specialInstructions,
		moreInfoURL
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: SITES_UPDATE_BY_ADMIN_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`${API_ENDPOINT}/sites/admin/get/${id}`,
				{
					siteName,
					country,
					province,
					siteLocation,
					postalCode,
					picURL,
					description,
					recommendations,
					specialEvents,
					specialInstructions,
					moreInfoURL,
				},
				config
			);

			dispatch({
				type: SITES_UPDATE_BY_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: SITES_UPDATE_BY_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const deleteSiteByAdmin = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SITES_DELETE_BY_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/sites/admin/get/${id}`, config);

		dispatch({
			type: SITES_DELETE_BY_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SITES_DELETE_BY_ADMIN_FAIL,
			payload: message,
		});
	}
};
