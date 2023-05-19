import React, { useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import MainScreen from "../../../../components/MainScreen";
import {
	deleteTranspoterByAdmin,
	transportListForAdmin,
} from "../../../../actions/transportManagementActions/transportActions";
import swal from "sweetalert";
import "./transportList.css";

const TransportListForAdmin = () => {
	const dispatch = useDispatch();

	const adminTransportList = useSelector((state) => state.adminTransportList);
	const { loading, transport, error } = adminTransportList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const transportDeleteByAdmin = useSelector((state) => state.transportDeleteByAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = transportDeleteByAdmin;

	const transportCreate = useSelector((state) => state.transportCreate);
	const { success: successCreate } = transportCreate;

	const transportUpdateByAdmin = useSelector((state) => state.transportUpdateByAdmin);
	const { success: successUpdate } = transportUpdateByAdmin;

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "You won't be able to recover these data",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(deleteTranspoterByAdmin(id));
				swal({
					title: "Success!",
					text: "Deleted Bus Entry Successfully",
					icon: "success",
					timer: 2000,
					button: false,
				});
			}
		});
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(transportListForAdmin());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);

	if (adminInfo) {
		return (
			<div className="adminTransportList">
				<br></br>
				<MainScreen>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "black",
									fontStyle: "italic",
								}}
							>
								Transport List For Admin
							</h1>
						</Col>
					</Row>
					<br></br>
					<Link to="/admin">
						<Button
							variant="success"
							style={{
								float: "left",
								marginTop: 5,
								fontSize: 15,
							}}
						>
							{" "}
							Back to Admin Main Page
						</Button>
					</Link>
					<Link to="/admin-transport-add">
						<Button variant="success" style={{ float: "right", fontSize: "15px" }}>
							Add A New Bus Entry
						</Button>
					</Link>
					<br></br>

					<div
						style={{
							minHeight: 700,
							marginBottom: "100px",
						}}
					>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
						{loading && <Loading />}
						{loadingDelete && <Loading />}
						<Table style={{ background: "white", marginTop: 50, borderRadius: 10 }}>
							<thead>
								<tr>
									<th>LicenseNo</th>
									<th>Starting</th>
									<th>Destination</th>
									<th>Travel-Time</th>
									<th>Seats</th>
									<th>Price (Rs.)</th>
									<th>MobileNo</th>
									<th>Leaving</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{transport &&
									transport.map((adminTransportList) => (
										<tr
											key={adminTransportList._id}
											style={{
												boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
												borderRadius: 10,
											}}
										>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.licensePlate}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.startingStation}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.destinationStation}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.totalTravelTime}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.totalNumberOfSeats}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.ticketPrice}
											</td>

											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.mobileNo}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{adminTransportList.leavingTime}
											</td>

											<td>
												<Link to={`/admin-transport-edit/${adminTransportList._id}`}>
													<Button
														style={{
															fontSize: 15,
															backgroundColor: "green",
															borderRadius: 0,
															border: "3px solid white",
														}}
													>
														{" "}
														Edit
													</Button>{" "}
												</Link>
											</td>
											<td>
												<Button
													onClick={() => deleteHandler(adminTransportList._id)}
													style={{
														fontSize: 15,
														backgroundColor: "red",
														borderRadius: 0,
														border: "3px solid white",
													}}
												>
													{" "}
													Delete
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>

						<br></br>
					</div>
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
};

export default TransportListForAdmin;
