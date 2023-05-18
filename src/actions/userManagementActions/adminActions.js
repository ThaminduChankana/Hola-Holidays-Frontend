import {
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_REGISTER_FAIL,
	ADMIN_REGISTER_REQUEST,
	ADMIN_REGISTER_SUCCESS,
	ADMIN_VIEW_FAIL,
	ADMIN_VIEW_REQUEST,
	ADMIN_VIEW_SUCCESS,
	ADMIN_UPDATE_FAIL,
	ADMIN_UPDATE_REQUEST,
	ADMIN_UPDATE_SUCCESS,
} from "../../constants/userManagementConstants/adminConstants";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

// admin loggin action
export const adminLogin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(`${API_ENDPOINT}/user/admin/login`, { email, password, isAdmin: true }, config);

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Admin Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//creating authheader for admin
export function authHeader() {
	let admin = JSON.parse(localStorage.getItem("adminInfo"));

	if (admin && admin.token) {
		return { Authorization: `Bearer ${admin.token}` };
	} else {
		return {};
	}
}

//admin log out action
export const adminLogout = () => async (dispatch) => {
	localStorage.removeItem("adminInfo");
	dispatch({ type: ADMIN_LOGOUT });
};

//admin register to system action
export const adminRegister = (name, telephone, address, email, password, pic) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(
			`${API_ENDPOINT}/user/admin/register`,
			{
				name,
				telephone,
				address,
				email,
				password,
				pic,
			},
			config
		);

		dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Admin Registration Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_REGISTER_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// admin to view their profile action
export const adminViewProfile = (admin) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADMIN_VIEW_REQUEST });

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/user/admin/view`, admin, config);

		dispatch({ type: ADMIN_VIEW_SUCCESS, payload: data });

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//admin to update their profile action
export const adminUpdateProfile = (admin) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADMIN_UPDATE_REQUEST });

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.put(`${API_ENDPOINT}/user/admin/edit`, admin, config);

		dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Admin Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
