import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import { createTransport } from "../../../../actions/transportManagementActions/transportActions";
import "./addTransport.css";

function AddTransport() {
	const [licensePlate, setLicensePlate] = useState("");
	const [startingStation, setStartingStation] = useState("");
	const [destinationStation, setDestinationStation] = useState("");
	const [totalTravelTime, setTotalTravelTime] = useState("");
	const [totalNumberOfSeats, setTotalNumberOfSeats] = useState("");
	const [ticketPrice, setTicketPrice] = useState("");
	const [facilities, setFacilities] = useState("");
	const [cityStops, setCityStops] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [leavingTime, setLeavingTime] = useState("");

	const [message] = useState(null);

	const dispatch = useDispatch();
	const navigate = useHistory();

	const transportCreate = useSelector((state) => state.transportCreate);
	const { loading, error } = transportCreate;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const resetHandler = () => {
		setLicensePlate("");
		setStartingStation("");
		setDestinationStation("");
		setTotalTravelTime("");
		setTotalNumberOfSeats("");
		setTicketPrice("");
		setFacilities("");
		setCityStops("");
		setMobileNo("");
		setLeavingTime("");
	};

	const demoHandler = () => {
		setLicensePlate("DM2345");
		setStartingStation("Colombo");
		setDestinationStation("Kandy");
		setTotalTravelTime("03:30");
		setTotalNumberOfSeats(50);
		setTicketPrice(800);
		setFacilities(["air conditioned", "wifi", "TV"]);
		setCityStops(["Kelaniya", "Nittambuwa", "Kegalle", "Peradeniya", "Kandy"]);
		setMobileNo("0772345678");
		setLeavingTime("7AM");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (
			!licensePlate ||
			!startingStation ||
			!destinationStation ||
			!totalTravelTime ||
			!totalNumberOfSeats ||
			!ticketPrice ||
			!facilities ||
			!cityStops ||
			!mobileNo ||
			!leavingTime
		)
			return;
		dispatch(
			createTransport(
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
			)
		);

		resetHandler();
		navigate.push("/admin-transport");
	};

	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="backgroundT">
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
								Add A New Bus Entry
							</h1>
						</Col>
					</Row>
					<Link to="/admin-transport">
						<Button
							variant="success"
							style={{
								float: "left",
								marginTop: 5,
								fontSize: 15,
							}}
						>
							{" "}
							Back to Transport Admin Page
						</Button>
					</Link>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="containerMain"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<div className="containerT">
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<br></br>
							<Row className="transportContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="siteFormBasicLicensePlate">
											<Form.Label style={{ fontWeight: "bold" }}>License Plate</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter License Plate"
												value={licensePlate}
												onChange={(e) => setLicensePlate(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicStartingStation">
											<Form.Label style={{ fontWeight: "bold" }}>Starting Station</Form.Label>
											<Form.Control
												type="text"
												value={startingStation}
												placeholder="Enter Starting Station"
												onChange={(e) => setStartingStation(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicDestinationStation">
											<Form.Label style={{ fontWeight: "bold" }}>Destination Station</Form.Label>
											<Form.Control
												type="text"
												value={destinationStation}
												placeholder="Enter Destination Station"
												onChange={(e) => setDestinationStation(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicTotalTravelTime">
											<Form.Label style={{ fontWeight: "bold" }}>Total Travel Time</Form.Label>
											<Form.Control
												type="text"
												value={totalTravelTime}
												placeholder="Enter Total Travel Time"
												onChange={(e) => setTotalTravelTime(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicTotalNumberOfSeats">
											<Form.Label style={{ fontWeight: "bold" }}>Total Number Of Seats</Form.Label>
											<Form.Control
												type="number"
												value={totalNumberOfSeats}
												placeholder="Enter Total Number Of Seats"
												onChange={(e) => setTotalNumberOfSeats(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicTicketPrice">
											<Form.Label style={{ fontWeight: "bold" }}>Ticket Price</Form.Label>
											<Form.Control
												type="number"
												value={ticketPrice}
												placeholder="Enter Ticket Price"
												onChange={(e) => setTicketPrice(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicFacilities">
											<Form.Label style={{ fontWeight: "bold" }}>Facilities</Form.Label>
											<Form.Control
												type="text"
												value={facilities}
												placeholder="Enter Facilities"
												onChange={(e) => setFacilities(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicCityStops">
											<Form.Label style={{ fontWeight: "bold" }}>City Stops</Form.Label>
											<Form.Control
												type="text"
												value={cityStops}
												placeholder="Enter City Stops"
												onChange={(e) => setCityStops(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicMobileNo">
											<Form.Label style={{ fontWeight: "bold" }}>Mobile Number</Form.Label>
											<Form.Control
												type="text"
												value={mobileNo}
												placeholder="Enter Mobile Number"
												onChange={(e) => setMobileNo(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicLeavingTime">
											<Form.Label style={{ fontWeight: "bold" }}>Leaving Time</Form.Label>
											<Form.Control
												type="text"
												value={leavingTime}
												placeholder="Enter Leaving Time"
												onChange={(e) => setLeavingTime(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Add Bus Entry
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={resetHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Reset Form
										</Button>
										&emsp;
										<Button
											variant="info"
											onClick={demoHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Demo
										</Button>
									</Form>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								></Col>
							</Row>
						</div>
						<br></br>
					</Card>
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

export default AddTransport;
