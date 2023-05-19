import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { API_ENDPOINT } from "../../../config";
import { listRoomCustomer } from "../../../actions/roomManagementActions/roomAction";
import "./hotel-view.css";

export default function SingleHotelView({ match, history }) {
	const [hotelName, setHotelName] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [facilities, setFacilities] = useState("");
	const [rules, setRules] = useState("");
	const [pic, setPic] = useState("");

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const roomListCustomer = useSelector((state) => state.roomListCustomer);
	const { customerRooms } = roomListCustomer;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/hotels/hotels/${match.params.id}`);
			setHotelName(data.hotelName);
			setAddress(data.address);
			setDescription(data.description);
			setFacilities(data.facilities);
			setRules(data.rules);
			setPic(data.pic);
		};

		fetching();
		dispatch(listRoomCustomer(match.params.id));
	}, [match.params.id, dispatch]);

	return (
		<div className="singleHotelView">
			<br></br>
			<br></br>
			<MainScreen title="">
				<h1
					style={{
						fontSize: "35px",
					}}
				>
					{hotelName}
				</h1>
				<h4 style={{ color: "goldenrod" }}>{address}</h4>
				<br></br>
				<div className="hotel-card">
					<img
						src={pic}
						alt=""
						style={{
							width: "1140px",
							height: "600px",
							borderRadius: "18px",
							borderWidth: "5px",
							border: "5px solid  #2b2b5c",
						}}
					></img>
					<br></br>
					<br></br>
					<br></br>
					<p style={{ fontSize: "20px", textAlign: "justify" }}>{description}</p>
					<br></br>
					<h4>Facilities</h4>
					<p style={{ fontSize: "20px", textAlign: "justify" }}>{facilities}</p>
					<br></br>
					<h4>Rules</h4>
					<p style={{ fontSize: "20px", textAlign: "justify" }}>{rules}</p>
				</div>
				<br></br>
				<h3>Availabile Rooms</h3>
				{customerRooms?.map((room) => (
					<div
						style={{
							height: "680px",
							width: "1150px",
							margin: "50px auto",
							boxShadow: "0 0 5px #ccc",
						}}
					>
						<div
							className="details"
							style={{ borderRadius: "15px", border: "3px solid  #2b2b5c", backgroundColor: "azure" }}
						>
							<div className="big-img">
								<img
									src={room.pic}
									alt=""
									style={{
										width: "450px",
										height: "500px",
										borderRadius: "15px",
									}}
								></img>
								<h2
									style={{
										fontSize: "25px",
										marginTop: "25px",
										fontWeight: "bold",
										color: "goldenrod",
									}}
								>
									Availability : {room.availability}
								</h2>
								<h2
									style={{
										fontSize: "25px",
										marginTop: "25px",
										fontWeight: "bold",
									}}
								>
									Rs {room.price} per day.
								</h2>
							</div>

							<div className="box">
								<h2>Room Type</h2>
								<p>{room.roomType}</p>
								<h2>Room Facilities</h2>
								<p>{room.roomFacilities}</p>
								<h2>bathroom Facilities</h2>
								<p>{room.bathRoomFacilities}</p>
								<h2>Beds</h2>
								<p>{room.beds}</p>
								<h2>Room Size</h2>
								<p>{room.roomSize}</p>
								{customerInfo ? (
									<Link to={`/create-reservation/${room._id}`}>
										<Button className="cart">Reserve</Button>
									</Link>
								) : (
									<></>
								)}
								&emsp;
							</div>
						</div>
					</div>
				))}
			</MainScreen>
		</div>
	);
}
