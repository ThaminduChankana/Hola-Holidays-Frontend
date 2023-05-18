import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form, Row } from "react-bootstrap";
import "./singleSite.css";
import { API_ENDPOINT } from "../../../../config";
import { Link } from "react-router-dom/cjs/react-router-dom";

function SingleSiteForCustomerScreen({ match, history }) {
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

	const openInNewTab = (url) => {
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};

	const onClickUrl = (url) => {
		return () => openInNewTab(url);
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/sites/get/${match.params.id}`);
			setSiteName(data.siteName);
			setCountry(data.country);
			setProvince(data.province);
			setSiteLocation(data.siteLocation);
			setPostalCode(data.postalCode);
			setDescription(data.description);
			setPicUrl(data.picURL);
			setRecommendations(data.recommendations);
			setSpecialEvents(data.specialEvents);
			setSpecialInstructions(data.specialInstructions);
			setMoreInfoURL(data.moreInfoURL);
		};

		fetching();
	}, [match.params.id]);

	return (
		<div className="siteViewBg">
			<br></br>
			<MainScreen title={`View Site - ${siteName}`}>
				<Link to="/">
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
							<Button onClick={onClickUrl(`${moreInfoURL}`)} variant="info" style={{ float: "right" }}>
								More Info
							</Button>
						</div>
						<div>
							<center>
								<h1>{siteName}</h1>
							</center>
						</div>
						<br></br>
						<center>
							<img
								src={picURL}
								alt={siteName}
								className="profilePic"
								style={{
									boxShadow: "7px 7px 20px ",
									borderColor: "black",
									borderRadius: 25,
									background: "white",
									width: "50%",
									height: "auto",
								}}
							/>
						</center>

						<Row className="SiteContainer">
							<Form style={{ width: "100%" }}>
								<br></br>
								<Form.Group controlId="siteFormBasicSiteName">
									<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Site Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Site Name"
										value={siteName}
										onChange={(e) => setSiteName(e.target.value)}
										readOnly
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
										readOnly
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
										readOnly
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
										readOnly
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
										readOnly
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
											padding: "10px",
										}}
										value={description}
										placeholder="Enter Site Description"
										onChange={(e) => setDescription(e.target.value)}
										readOnly
										rows={3}
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
											padding: "10px",
										}}
										value={recommendations}
										placeholder="Enter Recommendations"
										onChange={(e) => setRecommendations(e.target.value)}
										readOnly
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
											padding: "10px",
										}}
										value={specialEvents}
										placeholder="Enter Special Events"
										onChange={(e) => setSpecialEvents(e.target.value)}
										readOnly
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
											padding: "10px",
										}}
										value={specialInstructions}
										placeholder="Enter Special Instructions"
										onChange={(e) => setSpecialInstructions(e.target.value)}
										readOnly
										rows={5}
									/>
								</Form.Group>
								<br></br>
							</Form>
						</Row>
						<br></br>
					</div>
				</Card>
				<br></br>
			</MainScreen>
		</div>
	);
}

export default SingleSiteForCustomerScreen;
