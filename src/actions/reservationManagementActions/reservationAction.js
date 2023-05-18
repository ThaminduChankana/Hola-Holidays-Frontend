import {
	RESERVATION_LIST_FAIL,
	RESERVATION_LIST_REQUEST,
	RESERVATION_LIST_SUCCESS,
	ADMIN_RESERVATION_LIST_FAIL,
	ADMIN_RESERVATION_LIST_REQUEST,
	ADMIN_RESERVATION_LIST_SUCCESS,
	RESERVATION_CREATE_FAIL,
	RESERVATION_CREATE_REQUEST,
	RESERVATION_CREATE_SUCCESS,
	RESERVATION_UPDATE_REQUEST,
	RESERVATION_UPDATE_SUCCESS,
	RESERVATION_UPDATE_FAIL,
	RESERVATION_DELETE_FAIL,
	RESERVATION_DELETE_REQUEST,
	RESERVATION_DELETE_SUCCESS,
} from "../../constants/reservationManagementConstants/reservationConstant";
import { API_ENDPOINT } from "../../config";
import axios from "axios";
import swal from "sweetalert";

export const listReservation = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: RESERVATION_LIST_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/reservations/reservation/get/${customerInfo._id}`, config);

		dispatch({
			type: RESERVATION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: RESERVATION_LIST_FAIL,
			payload: message,
		});
	}
};

export const hotelListReservation = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_RESERVATION_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/reservations/get-reservations/${id}`, config);

		dispatch({
			type: ADMIN_RESERVATION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ADMIN_RESERVATION_LIST_FAIL,
			payload: message,
		});
	}
};

export const createReservationAction =
	(customer, customerName, customerEmail, room, checkInDate, checkOutDate) => async (dispatch, getState) => {
		try {
			dispatch({
				type: RESERVATION_CREATE_REQUEST,
			});

			const {
				customer_Login: { customerInfo },
			} = getState();

			const date1 = new Date(checkInDate);
			const date2 = new Date(checkOutDate);

			const diffInMs = Math.abs(date2 - date1);
			const noOfDates = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

			const noOfRooms = 1;
			const config = {
				headers: {
					Authorization: `Bearer ${customerInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`${API_ENDPOINT}/reservations/reservation/create`,
				{
					customer,
					customerName,
					customerEmail,
					room,
					checkInDate,
					checkOutDate,
					noOfDates,
					noOfRooms,
				},
				config
			);

			dispatch({
				type: RESERVATION_CREATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Reservation is created.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: RESERVATION_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateReservationAction = (id, rooms) => async (dispatch, getState) => {
	try {
		dispatch({
			type: RESERVATION_UPDATE_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};
		const noOfRooms = rooms;

		const { data } = await axios.put(`${API_ENDPOINT}/reservations/reservation/update/${id}`, { noOfRooms }, config);

		dispatch({
			type: RESERVATION_UPDATE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Reservation is updated",
			icon: "success",
			timer: 2000,
			button: false,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: RESERVATION_UPDATE_FAIL,
			payload: message,
		});
	}
};

export const deleteReservationAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: RESERVATION_DELETE_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/reservations/reservation/delete/${id}`, config);

		dispatch({
			type: RESERVATION_DELETE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Reservation is removed",
			icon: "success",
			timer: 2000,
			button: false,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: RESERVATION_DELETE_FAIL,
			payload: message,
		});
	}
};
