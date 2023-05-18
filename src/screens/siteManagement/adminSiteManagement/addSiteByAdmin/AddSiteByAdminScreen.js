import React, { useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { createSite } from "../../../../actions/siteManagementActions/siteActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import "./addSite.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { SITES_CREATE_AFTER_SUCCESS } from "../../../../constants/siteManagementConstants/siteConstants";

function AddSiteByAdminScreen() {
	const [siteName, setSiteName] = useState("");
	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [siteLocation, setSiteLocation] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [description, setDescription] = useState("");
	const [picURL, setPicUrl] = useState(
		"https://res.cloudinary.com/dfmnpw0yp/image/upload/v1682779898/Hola%20Holidays/assets/zsa4281sbunh7hq1kuys.jpg"
	);
	const [recommendations, setRecommendations] = useState("");
	const [specialEvents, setSpecialEvents] = useState("");
	const [specialInstructions, setSpecialInstructions] = useState("");
	const [moreInfoURL, setMoreInfoURL] = useState("");
	const [message] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();

	const siteCreate = useSelector((state) => state.siteCreate);
	const { loading, error, success } = siteCreate;

	const history = useHistory();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const resetHandler = () => {
		setSiteName("");
		setCountry("");
		setProvince("");
		setSiteLocation("");
		setPostalCode("");
		setDescription("");
		setRecommendations("");
		setSpecialEvents("");
		setSpecialInstructions("");
		setMoreInfoURL("");
		setPicUrl(
			"https://res.cloudinary.com/dfmnpw0yp/image/upload/v1682779898/Hola%20Holidays/assets/zsa4281sbunh7hq1kuys.jpg"
		);
		setPicMessage(null);
	};

	const demoHandler = () => {
		setSiteName("Dambulla Temple");
		setCountry("Sri Lanka");
		setProvince("North-Central");
		setSiteLocation("Dambulla");
		setPostalCode(21100);
		setDescription(
			"A sacred pilgrimage site for 22 centuries, this cave monastery, with its five sanctuaries, is the largest, best-preserved cave-temple complex in Sri Lanka."
		);
		setRecommendations(
			"Great site to see painted frescos amazingly painted on uneven rock. There were five caves open at the time of our visit and all had something of interest to see. If you are not in a rush then try to make time to visit here."
		);
		setSpecialEvents(
			"The temple is open from 7am to 7pm. The best time to visit is early morning or late afternoon. Sil events can be seen on full moon days."
		);
		setSpecialInstructions(
			"Be sure to but your ticket before you make the climb, and dress appropriately (although they will provide shawls to cover bare shoulders or knees if you are wearing shorts). You also need to remove your shoes and leave them at a station where the charge is 25 rupees a pair. The ground can get pretty hot, but the is a covered / shaded facade that runs from the second to fifth cave so you’re spare scorched soles."
		);
		setMoreInfoURL("https://en.wikipedia.org/wiki/Dambulla_cave_temple");
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (
			!siteName ||
			!country ||
			!province ||
			!siteLocation ||
			!postalCode ||
			!picURL ||
			!description ||
			!recommendations ||
			!specialEvents ||
			!specialInstructions ||
			!moreInfoURL
		)
			return;
		dispatch(
			await createSite(
				siteName,
				country,
				province,
				siteLocation,
				postalCode,
				picURL,
				description,
				recommendations,
				specialEvents,
				specialInstructions,
				moreInfoURL
			)
		);
		await dispatch({ type: SITES_CREATE_AFTER_SUCCESS, payload: null });
		resetHandler();
	};

	const postDetails = (pics) => {
		if (
			pics ===
			"https://res.cloudinary.com/dfmnpw0yp/image/upload/v1682779898/Hola%20Holidays/assets/zsa4281sbunh7hq1kuys.jpg"
		) {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "holaHolidaysSites");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPicUrl(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	if (adminInfo) {
		return (
			<div className="siteBg">
				<br></br>
				<MainScreen title="Add a New Site">
					<Link to="/admin-sites">
						<Button
							variant="success"
							style={{
								float: "left",
								marginTop: 5,
								fontSize: 15,
							}}
						>
							{" "}
							Back to Sites List
						</Button>
					</Link>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
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
						<div className="siteContainer">
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
								{success &&
									setTimeout(function () {
										history.push("/admin-sites");
									}, 2000)}
							</div>
							<br></br>
							<Row className="SiteContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="siteFormBasicSiteName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Name</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter Site Name"
												value={siteName}
												onChange={(e) => setSiteName(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicSiteCountry">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Located Country</Form.Label>
											<Form.Control
												type="text"
												value={country}
												placeholder="Enter Located Country"
												onChange={(e) => setCountry(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicProvince">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Province or State</Form.Label>
											<Form.Control
												type="text"
												value={province}
												placeholder="Enter located province or state"
												onChange={(e) => setProvince(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicLocation">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Located City</Form.Label>
											<Form.Control
												type="text"
												value={siteLocation}
												placeholder="Enter Site Location"
												onChange={(e) => setSiteLocation(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicCode">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Code</Form.Label>
											<Form.Control
												type="text"
												value={postalCode}
												placeholder="Enter Postal Code"
												onChange={(e) => setPostalCode(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicDescription">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Description</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={description}
												placeholder="Enter Site Description"
												onChange={(e) => setDescription(e.target.value)}
												required
												rows={7}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicRecommendations">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Recommendations</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={recommendations}
												placeholder="Enter Recommendations"
												onChange={(e) => setRecommendations(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormSpecialEvents">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Special Events</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={specialEvents}
												placeholder="Enter Special Events"
												onChange={(e) => setSpecialEvents(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicInstructions">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Special Instructions</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={specialInstructions}
												placeholder="Enter Special Instructions"
												onChange={(e) => setSpecialInstructions(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="siteFormBasicMoreInfo">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>More Info</Form.Label>
											<Form.Control
												type="text"
												value={moreInfoURL}
												placeholder="Enter More Info URL"
												onChange={(e) => setMoreInfoURL(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Picture</Form.Label>
											&emsp;
											<input
												type="file"
												accept="image/*"
												id="site-pic"
												onChange={(e) => postDetails(e.target.files[0])}
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
											Submit
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
											Reset
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
								>
									<img
										src={picURL}
										alt={siteName}
										className="sitePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 25,
											background: "white",
											margin: "15px",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
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

export default AddSiteByAdminScreen;
