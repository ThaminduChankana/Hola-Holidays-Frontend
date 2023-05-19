import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
	listReservation,
	updateReservationAction,
	deleteReservationAction,
} from "../../../actions/reservationManagementActions/reservationAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import {
	RESERVATION_UPDATE_AFTER_SUCCESS,
	RESERVATION_DELETE_AFTER_SUCCESS,
} from "../../../constants/reservationManagementConstants/reservationConstant";

export default function ReservationList() {
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const reservationList = useSelector((state) => state.reservationList);
	const { loading, reservations, error } = reservationList;

	const reservationDelete = useSelector((state) => state.reservationDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = reservationDelete;

	const reservationUpdate = useSelector((state) => state.reservationUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = reservationUpdate;

	const history = useHistory();

	const decreaseQuanity = async (id, noOfRooms) => {
		if (noOfRooms > 1) await dispatch(updateReservationAction(id, noOfRooms - 1));
		await dispatch({ type: RESERVATION_UPDATE_AFTER_SUCCESS, payload: null });
	};

	const increaseQuanity = async (id, noOfRooms) => {
		await dispatch(updateReservationAction(id, noOfRooms + 1));
		await dispatch({ type: RESERVATION_UPDATE_AFTER_SUCCESS, payload: null });
	};

	const deleteHandler = async (id) => {
		await dispatch(deleteReservationAction(id));
		await dispatch({ type: RESERVATION_DELETE_AFTER_SUCCESS, payload: null });
	};

	useEffect(() => {
		dispatch(listReservation());
	}, [dispatch, history, customerInfo._id, loadingUpdate, errorUpdate, successDelete]);

	if (customerInfo) {
		return (
			<div style={{ minHeight: 700 }} className="reservationList">
				<div
					style={{
						marginLeft: "20%",
						marginRight: "20%",
						marginBottom: "100px",
					}}
				>
					<br></br>
					<br></br>
					<h1 style={{ fontWeight: "400", fontSize: "50px", color: "white" }}>Reservations</h1>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{successUpdate &&
						setTimeout(function () {
							history.push("/reservations");
						}, 2000)}

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<Table style={{ background: "white" }}>
						<>
							<thead>
								<tr
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
										height: 60,
									}}
								>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										Hotel
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Room Type
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Check In
									</th>
									<th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Check Out
									</th>

									<th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										No of Rooms
									</th>
									<th
										style={{
											width: 10,
											fontSize: 20,
										}}
									></th>
								</tr>
							</thead>
							<tbody>
								{reservations?.reverse().map((cart) => (
									<tr
										key={cart._id}
										style={{
											boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
										}}
									>
										<td
											style={{
												fontSize: 20,
											}}
										>
											{cart.hotelName}
										</td>
										<td
											style={{
												fontSize: 20,
											}}
										>
											{cart.roomName}
										</td>
										<td
											style={{
												fontSize: 20,
											}}
										>
											{cart.checkInDate}
										</td>
										<td
											style={{
												fontSize: 20,
											}}
										>
											{cart.checkOutDate}
										</td>
										<td
											style={{
												fontSize: 20,
											}}
										>
											<Button
												style={{
													fontSize: 10,
													backgroundColor: "black",
													borderRadius: 0,
													border: "3px solid white",
												}}
												onClick={() => decreaseQuanity(cart._id, cart.noOfRooms)}
											>
												<i class="fa-solid fa-circle-minus"></i>
											</Button>
											&emsp;
											{cart.noOfRooms}
											&emsp;
											<Button
												style={{
													fontSize: 10,
													backgroundColor: "black",
													borderRadius: 0,
													border: "3px solid white",
												}}
												onClick={() => increaseQuanity(cart._id, cart.noOfRooms)}
											>
												<i class="fa-solid fa-circle-plus"></i>
											</Button>
										</td>
										<td>
											<Button
												style={{
													fontSize: 10,
													backgroundColor: "red",
													borderRadius: 0,
													border: "3px solid white",
												}}
												onClick={() => deleteHandler(cart._id)}
											>
												<i
													class="fa-solid fa-trash"
													onClick={() => deleteHandler(cart._id)}
													style={{ cursor: "pointer" }}
												></i>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</>
					</Table>
					<br></br>
				</div>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}
