import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import { UpdateTransport, authHeaderForAdmin } from "../../../../actions/transportManagementActions/transportActions";
import "./updateTransport.css";
import swal from "sweetalert";
import axios from "axios";
import { API_ENDPOINT } from "../../../../config";

function EditTransport({ match, history }) {
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

	const dispatch = useDispatch();
	const navigate = useHistory();

	const transportUpdateByAdmin = useSelector((state) => state.transportUpdateByAdmin);
	const { loading, error } = transportUpdateByAdmin;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`${API_ENDPOINT}/transport/admin/get/${match.params.id}`, {
					headers: authHeaderForAdmin(),
				});
				setLicensePlate(data.licensePlate);
				setStartingStation(data.startingStation);
				setDestinationStation(data.destinationStation);
				setTotalTravelTime(data.totalTravelTime);
				setTotalNumberOfSeats(data.totalNumberOfSeats);
				setTicketPrice(data.ticketPrice);
				setFacilities(data.facilities);
				setCityStops(data.cityStops);
				setMobileNo(data.mobileNo);
				setLeavingTime(data.leavingTime);
			};

			fetching();
		}
	}, [match.params.id, adminInfo]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			UpdateTransport(
				match.params.id,
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

		swal({
			title: "Success !!!",
			text: "Update Successful.",
			icon: "success",
			button: false,
		});
		navigate.push("/admin-transport");
	};

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
								Update Bus Entry Details
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
												value={licensePlate}
												onChange={(e) => setLicensePlate(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicStartingStation">
											<Form.Label style={{ fontWeight: "bold" }}>Starting Station</Form.Label>
											<Form.Control
												type="text"
												value={startingStation}
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
											Update Bus Entry
										</Button>
										&emsp;
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

export default EditTransport;
