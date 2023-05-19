import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createRoomAction } from "../../../actions/roomManagementActions/roomAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { ROOM_CREATE_ADMIN_AFTER_SUCCESS } from "../../../constants/roomManagementConstants/roomConstant";

export default function CreateRoom({ match }) {
	const [roomType, setRoomType] = useState("");
	const [availability, setAvailability] = useState("");
	const [beds, setBeds] = useState("");
	const [roomSize, setRoomSize] = useState("");
	const [roomFacilities, setRoomFacilities] = useState("");
	const [bathRoomFacilities, setBathRoomFacilities] = useState("");
	const [price, setPrice] = useState("");
	const [pic, setPic] = useState("");
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const roomCreate = useSelector((state) => state.roomCreate);
	const { loading, error, success } = roomCreate;

	const history = useHistory();

	const resetHandler = () => {
		setRoomType("");
		setAvailability("");
		setBeds("");
		setRoomSize("");
		setRoomFacilities("");
		setBathRoomFacilities("");
		setPrice("");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setRoomType("Standard Double Room");
		setAvailability("100");
		setBeds("1 queen bed, 3 twin beds ");
		setRoomSize("27 m²");
		setRoomFacilities(
			"Upper floors accessible by elevator, Entire unit wheelchair accessible,Linens,Wardrobe or closet,Hand sanitizer"
		);
		setBathRoomFacilities("Free toiletries, Bidet, Toilet, Bathtub or shower");
		setPrice("15000");
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

		dispatch(
			createRoomAction(
				match.params.id,
				roomType,
				availability,
				beds,
				roomSize,
				roomFacilities,
				bathRoomFacilities,
				price,
				pic
			)
		);
		setTimeout(function () {
			history.push("/hotels-admin-view");
		}, 2000);

		dispatch({ type: ROOM_CREATE_ADMIN_AFTER_SUCCESS, payload: null });
	};

	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="createRoom">
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
								Add Room
							</div>
						</div>
						<Card.Body style={{ marginLeft: "10%", marginRight: "10%", marginTop: "50px", marginBottom: "50px" }}>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{success &&
									setTimeout(function () {
										history.push("/hotels-admin-view");
									}, 2000)}
								<Form.Group controlId="roomType">
									<Form.Control
										type="name"
										value={roomType}
										placeholder="Room Type"
										onChange={(e) => setRoomType(e.target.value)}
										required
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
									/>
								</Form.Group>
								<br></br>

								<Form.Group controlId="availability">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										type="number"
										placeholder="Availability"
										required
										value={availability}
										onChange={(e) => setAvailability(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="beds">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										placeholder="Beds"
										type="beds"
										required
										value={beds}
										onChange={(e) => setBeds(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="roomSize">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="description"
										value={roomSize}
										placeholder="Room size"
										onChange={(e) => setRoomSize(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="roomFacilities">
									<Form.Control
										style={{
											height: 80,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="facilities"
										value={roomFacilities}
										placeholder="Room Facilities"
										onChange={(e) => setRoomFacilities(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="bathroomFacilities">
									<Form.Control
										style={{
											height: 80,
											fontSize: 18,
											padding: "20px",
										}}
										as="textarea"
										type="rules"
										value={bathRoomFacilities}
										placeholder="Bathroom Facilities"
										onChange={(e) => setBathRoomFacilities(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								<Form.Group controlId="price">
									<Form.Control
										style={{
											height: 60,
											fontSize: 18,
											padding: "20px",
										}}
										type="number"
										required
										value={price}
										placeholder="Price"
										onChange={(e) => setPrice(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
								<Form.Group controlId="pic">
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
}
