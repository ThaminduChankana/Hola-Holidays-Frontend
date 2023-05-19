import {
	ROOM_LIST_ADMIN_REQUEST,
	ROOM_LIST_ADMIN_SUCCESS,
	ROOM_LIST_ADMIN_FAIL,
	ROOM_CREATE_ADMIN_REQUEST,
	ROOM_CREATE_ADMIN_SUCCESS,
	ROOM_CREATE_ADMIN_FAIL,
	ROOM_UPDATE_ADMIN_REQUEST,
	ROOM_UPDATE_ADMIN_SUCCESS,
	ROOM_UPDATE_ADMIN_FAIL,
	ROOM_DELETE_ADMIN_REQUEST,
	ROOM_DELETE_ADMIN_SUCCESS,
	ROOM_DELETE_ADMIN_FAIL,
	ROOM_LIST_CUSTOMER_REQUEST,
	ROOM_LIST_CUSTOMER_SUCCESS,
	ROOM_LIST_CUSTOMER_FAIL,
} from "../../constants/roomManagementConstants/roomConstant";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

export const listRoomAdmin = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ROOM_LIST_ADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};
		const { data } = await axios.get(`${API_ENDPOINT}/rooms/get-rooms/${id}`, config);

		dispatch({
			type: ROOM_LIST_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ROOM_LIST_ADMIN_FAIL,
			payload: message,
		});
	}
};

export const listRoomCustomer = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ROOM_LIST_CUSTOMER_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/rooms/rooms/${id}`);

		dispatch({
			type: ROOM_LIST_CUSTOMER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ROOM_LIST_CUSTOMER_FAIL,
			payload: message,
		});
	}
};

export const createRoomAction =
	(hotel, roomType, availability, beds, roomSize, roomFacilities, bathRoomFacilities, price, pic) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: ROOM_CREATE_ADMIN_REQUEST,
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
				`${API_ENDPOINT}/rooms/room/create`,
				{
					admin,
					hotel,
					roomType,
					availability,
					beds,
					roomSize,
					roomFacilities,
					bathRoomFacilities,
					price,
					pic,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Room successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: ROOM_CREATE_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ROOM_CREATE_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const updateRoomAction =
	(id, roomType, availability, beds, roomSize, roomFacilities, bathRoomFacilities, price, pic) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: ROOM_UPDATE_ADMIN_REQUEST,
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
				`${API_ENDPOINT}/rooms/room/${id}`,
				{
					roomType,
					availability,
					beds,
					roomSize,
					roomFacilities,
					bathRoomFacilities,
					price,
					pic,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Room successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: ROOM_UPDATE_ADMIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ROOM_UPDATE_ADMIN_FAIL,
				payload: message,
			});
		}
	};

export const deleteRoomAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ROOM_DELETE_ADMIN_REQUEST,
		});
		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`${API_ENDPOINT}/rooms/room/delete/${id}`, config);

		dispatch({
			type: ROOM_DELETE_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ROOM_DELETE_ADMIN_FAIL,
			payload: message,
		});
	}
};
