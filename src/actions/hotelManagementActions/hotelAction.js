import {
	HOTEL_LIST_ADMIN_REQUEST,
	HOTEL_LIST_ADMIN_SUCCESS,
	HOTEL_LIST_ADMIN_FAIL,
	HOTEL_CREATE_ADMIN_REQUEST,
	HOTEL_CREATE_ADMIN_SUCCESS,
	HOTEL_CREATE_ADMIN_FAIL,
	HOTEL_UPDATE_ADMIN_REQUEST,
	HOTEL_UPDATE_ADMIN_SUCCESS,
	HOTEL_UPDATE_ADMIN_FAIL,
	HOTEL_DELETE_ADMIN_REQUEST,
	HOTEL_DELETE_ADMIN_SUCCESS,
	HOTEL_DELETE_ADMIN_FAIL,
	HOTEL_LIST_CUSTOMER_REQUEST,
	HOTEL_LIST_CUSTOMER_SUCCESS,
	HOTEL_LIST_CUSTOMER_FAIL,
} from "../../constants/hotelManagementConstants/hotelConstant";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

export const listHotelAdmin = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: HOTEL_LIST_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};
		const { data } = await axios.get(`${API_ENDPOINT}/hotels/get-hotels/${adminInfo._id}`, config);

		dispatch({
			type: HOTEL_LIST_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: HOTEL_LIST_ADMIN_FAIL,
			payload: message,
		});
	}
};

export const listHotelCustomer = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: HOTEL_LIST_CUSTOMER_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/hotels/hotels`);

		dispatch({
			type: HOTEL_LIST_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: HOTEL_LIST_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const createHotelAction =
	(hotelName, address, location, description, facilities, rules, pic) => async (dispatch, getState) => {
		try {
			dispatch({
				type: HOTEL_CREATE_ADMIN_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};
			const admin = adminInfo._id;
			const { data } = await axios.post(
				`${API_ENDPOINT}/hotels/hotel/create`,
				{
					admin,
					hotelName,
					address,
					location,
					description,
					facilities,
					rules,
					pic,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Hotel successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: HOTEL_CREATE_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: HOTEL_CREATE_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const updateHotelAction =
	(id, hotelName, address, location, description, facilities, rules, pic) => async (dispatch, getState) => {
		try {
			dispatch({
				type: HOTEL_UPDATE_ADMIN_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`${API_ENDPOINT}/hotels/hotel/${id}`,
				{
					hotelName,
					address,
					location,
					description,
					facilities,
					rules,
					pic,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Hotel successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: HOTEL_UPDATE_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: HOTEL_UPDATE_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const deleteHotelAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: HOTEL_DELETE_ADMIN_REQUEST,
		});
		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/hotels/hotel/delete/${id}`, config);

		dispatch({
			type: HOTEL_DELETE_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: HOTEL_DELETE_ADMIN_FAIL,
			payload: message,
		});
	}
};
