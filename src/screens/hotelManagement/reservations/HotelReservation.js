import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { hotelListReservation } from "../../../actions/reservationManagementActions/reservationAction";
import Table from "react-bootstrap/Table";
import "./hotelManagement.css";

export default function HotelReservation({ match, history }) {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const hotelReservationList = useSelector((state) => state.hotelReservationList);
	const { hotelReservations } = hotelReservationList;

	useEffect(() => {
		dispatch(hotelListReservation(match.params.id));
	}, [match.params.id, dispatch]);

	if (adminInfo) {
		return (
			<div className="reservation">
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>
					<h1
						style={{
							fontSize: "45px",
							fontWeight: "bold",
							marginLeft: "120px",
							color: "white",
						}}
					>
						Reservations
					</h1>
					<br></br>
					<br></br>
					<Table style={{ background: "white", width: "900px", marginLeft: "110px" }}>
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
										Customer Name
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Room Name
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
								{hotelReservations?.reverse().map((cart) => (
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
											{cart.customerName}
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
											{cart.noOfRooms}
										</td>
									</tr>
								))}
							</tbody>
						</>
					</Table>
					<br></br>
					<br></br>
				</MainScreen>
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
