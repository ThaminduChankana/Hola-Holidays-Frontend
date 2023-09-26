import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createHotelAction } from "../../../actions/hotelManagementActions/hotelAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { HOTEL_CREATE_ADMIN_AFTER_SUCCESS } from "../../../constants/hotelManagementConstants/hotelConstant";
import "./hotelManagement.css";

const CreateHotel = () => {
	const [hotelName, setHotelName] = useState("");
	const [address, setAddress] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [facilities, setFacilities] = useState("");
	const [rules, setRules] = useState("");
	const [pic, setPic] = useState("");
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const hotelCreate = useSelector((state) => state.hotelCreate);
	const { loading, error, success } = hotelCreate;

	const history = useHistory();

	const resetHandler = () => {
		setHotelName("");
		setAddress("");
		setLocation("");
		setDescription("");
		setFacilities("");
		setRules("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setHotelName("Granbell Hotel Colombo");
		setAddress("282/5, Kollupitiya Road, Kollupitiya, 00300 Colombo, Sri Lanka");
		setLocation("Colombo");
		setDescription(
			"Located in Colombo, a few steps from Kollupitiya Beach, Granbell Hotel Colombo has accommodations with an outdoor swimming pool, free private parking, a fitness center and a terrace. Offering a restaurant, the property also has a bar, as well as a sauna and a hot tub. The property provides room service, a 24-hour front desk and currency exchange for guests. The hotel will provide guests with air-conditioned rooms offering a desk, an electric tea pot, a fridge, a safety deposit box, a flat-screen TV and a private bathroom with a shower. Free WiFi is accessible to all guests, while certain rooms also offer a balcony. At Granbell Hotel Colombo the rooms are equipped with bed linen and towels. The accommodation offers an à la carte or continental breakfast. Popular points of interest near Granbell Hotel Colombo include Bambalapitiya Beach, Galle Face Beach and Bambalapitiya Railway Station. The nearest airport is Ratmalana International Airport, 12.1 km from the hotel. Couples in particular like the location – they rated it 9.1 for a two-person trip."
		);
		setFacilities("Outdoor swimming pool, Free WiFi , Spa");
		setRules(
			"Check-in between 2pm to 11.30 pm , Check-out between 7am to 12.00 pm, Cancellation and prepayment policies vary according to accommodations type"
		);
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please Select an Image");
		}
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "notezipper");
			data.append("cloud_name", "dfnqhfdyw");
			fetch("https://api.cloudinary.com/v1_1/dfnqhfdyw/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(createHotelAction(hotelName, address, location, description, facilities, rules, pic));
		setTimeout(function () {
			history.push("/hotels-admin-view");
		}, 2000);

		dispatch({ type: HOTEL_CREATE_ADMIN_AFTER_SUCCESS, payload: null });
	};

	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="createHotel">
				<br></br>
				<MainScreen title="">
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
								Add Hotel
							</div>
						</div>
						<Card.Body style={{ marginLeft: "10%", marginRight: "10%", marginTop: "50px", marginBottom: "50px" }}>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{success &&
									setTimeout(function () {
										history.push("/hotels-admin-view");
									}, 2000)}
								<Form.Group controlId="nic">
									<Form.Control
										type="name"
										value={hotelName}
										placeholder="Hotel Name"
										onChange={(e) => setHotelName(e.target.value)}
										required
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
									/>
								</Form.Group>
								<br></br>

								<Form.Group controlId="address">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										placeholder="Address"
										type="address"
										required
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="location">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										placeholder="Location"
										type="location"
										required
										value={location}
										onChange={(e) => setLocation(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="description">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="description"
										value={description}
										placeholder="Description"
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="facilities">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="facilities"
										value={facilities}
										placeholder="Facilities"
										onChange={(e) => setFacilities(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="rules">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="rules"
										value={rules}
										placeholder="Rules"
										onChange={(e) => setRules(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
								<Form.Group controlId="pic">
									<input
										style={{
											height: 60,
											fontSize: 18,
											width: "300px",
										}}
										type="file"
										accept="image/*"
										id="hotel-pic"
										onChange={(e) => postDetails(e.target.files[0])}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 20, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 20, marginTop: 10 }}
									className="mx-2"
									onClick={resetHandler}
									variant="danger"
								>
									Reset
								</Button>
								<Button
									variant="info"
									onClick={demoHandler}
									style={{
										fontSize: 20,
										marginTop: 10,
									}}
								>
									Demo
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

export default CreateHotel;
