import {
    TRANSPORT_LIST_FOR_CUSTOMER_REQUEST,
    TRANSPORT_LIST_FOR_CUSTOMER_SUCCESS,
    TRANSPORT_LIST_FOR_CUSTOMER_FAIL,
    TRANSPORT_LIST_FOR_ADMIN_REQUEST,
    TRANSPORT_LIST_FOR_ADMIN_SUCCESS,
    TRANSPORT_LIST_FOR_ADMIN_FAIL,
    TRANSPORT_CREATE_REQUEST,
    TRANSPORT_CREATE_SUCCESS,
    TRANSPORT_CREATE_FAIL,
    TRANSPORT_UPDATE_BY_ADMIN_REQUEST,
    TRANSPORT_UPDATE_BY_ADMIN_SUCCESS,
    TRANSPORT_UPDATE_BY_ADMIN_FAIL,
    TRANSPORT_DELETE_BY_ADMIN_REQUEST,
    TRANSPORT_DELETE_BY_ADMIN_SUCCESS, 
    TRANSPORT_DELETE_BY_ADMIN_FAIL
} from '../../constants/transportManagementConstants/transportConstant';
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import swal from "sweetalert";

export function authHeaderForAdmin() {
	let admin = JSON.parse(localStorage.getItem("adminInfo"));

	if (admin && admin.token) {
		return { Authorization: `Bearer ${admin.token}` };
	} else {
		return {};
	}
}

export const transportListForCustomer = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRANSPORT_LIST_FOR_CUSTOMER_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/transport/get`);

		dispatch({
			type: TRANSPORT_LIST_FOR_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRANSPORT_LIST_FOR_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const transportListForAdmin = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRANSPORT_LIST_FOR_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/transport/get`, config);

		dispatch({
			type: TRANSPORT_LIST_FOR_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRANSPORT_LIST_FOR_ADMIN_FAIL,
			payload: message,
		});
	}
};

export const transportCreate =
	(
		licensePlate,
		startingStation,
		destinationStation,
		totalTravelTime,
		totalNumberOfSeats,
		ticketPrice,
		facilities,
		cityStops,
		mobileNo,
		leavingTime
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: TRANSPORT_CREATE_REQUEST,
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
				`${API_ENDPOINT}/transport/add`,
				{
					licensePlate,
					startingStation,
					destinationStation,
					totalTravelTime,
					totalNumberOfSeats,
					ticketPrice,
					facilities,
					cityStops,
					mobileNo,
					leavingTime
				},
				config
			);

			dispatch({
				type: TRANSPORT_CREATE_SUCCESS,
				payload: data,
			});
			swal.fire({
				title: "Success",
				text: "Bus entry added successfully",
				icon: "success",
				timer: 2000,
			});
			setTimeout(function () {
				window.location.href = "/transport/get";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TRANSPORT_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const transportUpdateByAdmin =
	(
		id,
		licensePlate,
		startingStation,
		destinationStation,
		totalTravelTime,
		totalNumberOfSeats,
		ticketPrice,
		facilities,
		cityStops,
		mobileNo,
		leavingTime
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: TRANSPORT_UPDATE_BY_ADMIN_REQUEST,
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
				`${API_ENDPOINT}/transport/get/${id}`,
				{
					licensePlate,
					startingStation,
					destinationStation,
					totalTravelTime,
					totalNumberOfSeats,
					ticketPrice,
					facilities,
					cityStops,
					mobileNo,
					leavingTime
				},
				config
			);

			dispatch({
				type: TRANSPORT_UPDATE_BY_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TRANSPORT_UPDATE_BY_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const transportDeleteByAdmin = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TRANSPORT_DELETE_BY_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/transport/get/${id}`, config);

		dispatch({
			type: TRANSPORT_DELETE_BY_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TRANSPORT_DELETE_BY_ADMIN_FAIL,
			payload: message,
		});
	}
};