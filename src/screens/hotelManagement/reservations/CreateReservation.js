import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createReservationAction } from "../../../actions/reservationManagementActions/reservationAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import "./hotelManagement.css";
import { RESERVATION_CREATE_AFTER_SUCCESS } from "../../../constants/reservationManagementConstants/reservationConstant";
import { useHistory } from "react-router-dom";

const CreateReservation = ({ match }) => {
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const [customerName, setCustomerName] = useState(customerInfo.firstName + " " + customerInfo.lastName);
	const [customerEmail, setCustomerEmail] = useState(customerInfo.email);
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");

	const reservationCreate = useSelector((state) => state.reservationCreate);
	const { loading, error, success } = reservationCreate;

	const history = useHistory();

	const submitHandler = async (e) => {
		e.preventDefault();

		await dispatch(
			createReservationAction(customerInfo._id, customerName, customerEmail, match.params.id, checkInDate, checkOutDate)
		);
		await dispatch({ type: RESERVATION_CREATE_AFTER_SUCCESS, payload: null });
	};

	useEffect(() => {}, []);
	if (customerInfo) {
		return (
			<div className="reservationCreate">
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							outline: "none",
							marginLeft: 110,
							borderRadius: "20px",
							border: "2px solid black",
						}}
					>
						<div
							style={{
								position: "relative",
								textAlign: "center",
								color: "white",
								fontSize: "65px",
								fontWeight: "bold",
							}}
						>
							{" "}
							<img
								src="http://travelji.com/wp-content/uploads/Hotel-Tips.jpg"
								alt=""
								style={{
									width: "100%",
									height: "250px",
									background: "linear - gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
									borderRadius: "15px 15px 0px 0px",
								}}
							></img>
							<div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
								Reservation
							</div>
						</div>
						<Card.Body style={{ marginLeft: "10%", marginRight: "10%", marginTop: "50px", marginBottom: "50px" }}>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{success &&
									setTimeout(function () {
										history.push("/reservations");
									}, 2000)}
								<Form.Group controlId="name">
									<Form.Label
										style={{
											fontSize: 18,
											fontWeight: "bold",
										}}
									>
										Name
									</Form.Label>
									<Form.Control
										type="name"
										value={customerName}
										onChange={(e) => setCustomerName(e.target.value)}
										required
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
									/>
								</Form.Group>
								<br></br>

								<Form.Group controlId="email">
									<Form.Label
										style={{
											fontSize: 18,
											fontWeight: "bold",
										}}
									>
										Email
									</Form.Label>
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										required
										value={customerEmail}
										onChange={(e) => setCustomerEmail(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="checkInDate">
									<Form.Label
										style={{
											fontSize: 18,
											fontWeight: "bold",
										}}
									>
										Check In Date
									</Form.Label>
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										type="date"
										required
										value={checkInDate}
										onChange={(e) => setCheckInDate(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="checkOutDate">
									<Form.Label
										style={{
											fontSize: 18,
											fontWeight: "bold",
										}}
									>
										Check Out Date
									</Form.Label>
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										type="date"
										required
										value={checkOutDate}
										onChange={(e) => setCheckOutDate(e.target.value)}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 20, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
					<br></br>
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
};

export default CreateReservation;
