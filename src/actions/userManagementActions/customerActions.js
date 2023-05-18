import {
	CUSTOMER_LOGIN_FAIL,
	CUSTOMER_LOGIN_REQUEST,
	CUSTOMER_LOGIN_SUCCESS,
	CUSTOMER_LOGOUT,
	CUSTOMER_REGISTER_FAIL,
	CUSTOMER_REGISTER_REQUEST,
	CUSTOMER_REGISTER_SUCCESS,
	CUSTOMER_VIEW_FAIL,
	CUSTOMER_VIEW_REQUEST,
	CUSTOMER_VIEW_SUCCESS,
	CUSTOMER_UPDATE_FAIL,
	CUSTOMER_UPDATE_REQUEST,
	CUSTOMER_UPDATE_SUCCESS,
	CUSTOMER_DELETE_FAIL,
	CUSTOMER_DELETE_REQUEST,
	CUSTOMER_DELETE_SUCCESS,
	CUSTOMER_LIST_FAIL,
	CUSTOMER_LIST_REQUEST,
	CUSTOMER_LIST_SUCCESS,
	CUSTOMER_VIEW_BY_ID_FAIL,
	CUSTOMER_VIEW_BY_ID_REQUEST,
	CUSTOMER_VIEW_BY_ID_SUCCESS,
	CUSTOMER_UPDATE_BY_ID_FAIL,
	CUSTOMER_UPDATE_BY_ID_REQUEST,
	CUSTOMER_UPDATE_BY_ID_SUCCESS,
	CUSTOMER_DELETE_BY_ID_FAIL,
	CUSTOMER_DELETE_BY_ID_REQUEST,
	CUSTOMER_DELETE_BY_ID_SUCCESS,
} from "../../constants/userManagementConstants/customerConstants";
import axios from "axios";
import Swal from "sweetalert2";
import { API_ENDPOINT } from "../../config";

// customer loggin action
export const customerLogin = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		//call the backend route
		const { data } = await axios.post(
			`${API_ENDPOINT}/user/customer/login`,
			{ email, password, isAdmin: false },
			config
		);

		dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
		Swal.fire({
			title: "Success !!!",
			text: "Customer Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		localStorage.setItem("customerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CUSTOMER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//creating authheader for customer
export function authHeader() {
	let customer = JSON.parse(localStorage.getItem("customerInfo"));

	if (customer && customer.token) {
		return { Authorization: `Bearer ${customer.token}` };
	} else {
		return {};
	}
}

//customer log out action
export const customerLogout = () => async (dispatch) => {
	localStorage.removeItem("customerInfo");
	dispatch({ type: CUSTOMER_LOGOUT });
};

//customer register to system action
export const customerRegister =
	(firstName, lastName, telephone, address, gender, country, email, password, pic) => async (dispatch) => {
		try {
			dispatch({ type: CUSTOMER_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			//call the backend route
			const { data } = await axios.post(
				`${API_ENDPOINT}/user/customer/register`,
				{
					firstName,
					lastName,
					telephone,
					address,
					gender,
					country,
					email,
					password,
					pic,
				},
				config
			);

			dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data });
			Swal.fire({
				title: "Success !!!",
				text: "Customer Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			dispatch({
				type: CUSTOMER_REGISTER_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};
// customer to view their profile action
export const customerViewProfile = (customer) => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_VIEW_REQUEST });

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/user/customer/view`, customer, config);

		dispatch({ type: CUSTOMER_VIEW_SUCCESS, payload: data });

		dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("customerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CUSTOMER_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//customer to update their profile action
export const customerUpdateProfile = (customer) => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_UPDATE_REQUEST });

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.put(`${API_ENDPOINT}/user/customer/edit`, customer, config);

		dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
		Swal.fire({
			title: "Success !!!",
			text: "Customer Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("customerInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CUSTOMER_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// customer to delete their profile action
export const customerDeleteProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_DELETE_REQUEST });

		const {
			customer_Login: { customerInfo },
		} = getState();
		console.log(customerInfo);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.delete(`${API_ENDPOINT}/user/customer/delete`, config);

		dispatch({ type: CUSTOMER_DELETE_SUCCESS, payload: data });

		dispatch({ type: CUSTOMER_LOGOUT });
		localStorage.removeItem("customerInfo");
	} catch (error) {
		dispatch({
			type: CUSTOMER_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

//get all of customer list for  admin action
export const customersList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CUSTOMER_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/user/admin/customers`, config);

		dispatch({
			type: CUSTOMER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: CUSTOMER_LIST_FAIL,
			payload: message,
		});
	}
};

// view customer profile by  admin action
export const customerViewProfileById =
	(id, firstName, lastName, telephone, address, gender, country, email, password, pic) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: CUSTOMER_VIEW_BY_ID_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			//call the backend route
			const { data } = await axios.get(
				`${API_ENDPOINT}/user/admin/customer/profile/view/${id}`,
				{
					id,
					firstName,
					lastName,
					telephone,
					address,
					gender,
					country,
					email,
					password,
					pic,
				},
				config
			);

			dispatch({
				type: CUSTOMER_VIEW_BY_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: CUSTOMER_VIEW_BY_ID_FAIL,
				payload: message,
			});
		}
	};

// customer to update their profile by admin action
export const customerUpdateProfileById =
	(id, firstName, lastName, telephone, address, gender, country, email, password, pic, message) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: CUSTOMER_UPDATE_BY_ID_REQUEST,
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

			//call the backend route
			const { data } = await axios.put(
				`${API_ENDPOINT}/user/admin/customer/profile/edit/${id}`,
				{
					firstName,
					lastName,
					telephone,
					address,
					gender,
					country,
					email,
					password,
					pic,
					message,
				},
				config
			);

			dispatch({
				type: CUSTOMER_UPDATE_BY_ID_SUCCESS,
				payload: data,
			});
			Swal.fire({
				title: "Success !!!",
				text: "Customer Account Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			const message = "Customer Update Failed !!!";
			dispatch({
				type: CUSTOMER_UPDATE_BY_ID_FAIL,
				payload: message,
			});
		}
	};

//customer to delete their profilr by admin action
export const customerDeleteProfileById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CUSTOMER_DELETE_BY_ID_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.delete(`${API_ENDPOINT}/user/admin/customer/profile/view/${id}`, config);

		dispatch({
			type: CUSTOMER_DELETE_BY_ID_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Customer Delete Failed !!!";
		dispatch({
			type: CUSTOMER_DELETE_BY_ID_FAIL,
			payload: message,
		});
	}
};
