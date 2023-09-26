import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateHotelAction } from "../../../actions/hotelManagementActions/hotelAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import "./hotelManagement.css";
import { authHeader } from "../../../actions/userManagementActions/adminActions";
import { HOTEL_UPDATE_ADMIN_AFTER_SUCCESS } from "../../../constants/hotelManagementConstants/hotelConstant";
import { API_ENDPOINT } from "../../../config";

export default function UpdateHotel({ match }) {
	const [hotelName, setHotelName] = useState("");
	const [address, setAddress] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [facilities, setFacilities] = useState("");
	const [rules, setRules] = useState("");
	const [pic, setPic] = useState("https://wallpapercave.com/wp/wp3598835.jpg");
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const hotelUpdate = useSelector((state) => state.hotelUpdate);
	const { loading, error, success } = hotelUpdate;

	const history = useHistory();

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/hotels/hotel/${match.params.id}`, {
				headers: authHeader(),
			});
			setHotelName(data.hotelName);
			setAddress(data.address);
			setLocation(data.location);
			setDescription(data.description);
			setFacilities(data.facilities);
			setRules(data.rules);
			setPic(data.pic);
		};

		fetching();
	}, [match.params.id, dispatch]);

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

		dispatch(updateHotelAction(match.params.id, hotelName, address, location, description, facilities, rules, pic));
		setTimeout(function () {
			history.push("/hotels-admin-view");
		}, 2000);

		dispatch({ type: HOTEL_UPDATE_ADMIN_AFTER_SUCCESS, payload: null });
	};

	if (adminInfo) {
		return (
			<div className="updateHotel">
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>
					<div className="row">
						<span style={{ display: "flex" }}>
							<Link to={`/room-details/${match.params.id}`}>
								<Button style={{ marginLeft: "900px", width: "50px", height: "50px", fontSize: "20px" }}>
									<i class="fa fa-bed" aria-hidden="true"></i>
								</Button>
							</Link>

							<Link to={`/hotel-reservations/${match.params.id}`}>
								<Button style={{ marginLeft: "30px", width: "50px", height: "50px", fontSize: "20px" }}>
									<i class="fa fa-calendar" aria-hidden="true"></i>
								</Button>
							</Link>
						</span>
					</div>
					<br></br>
					<br></br>
					<Card
						style={{
							width: "80%",
							borderWidth: 0,
							border: "2px solid black",
							marginLeft: 110,
							borderRadius: "20px",
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
								Update Hotel
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
											height: 80,
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
											height: 80,
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
											height: 80,
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
}
