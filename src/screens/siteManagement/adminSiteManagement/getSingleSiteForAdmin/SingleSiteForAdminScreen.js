import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeaderForAdmin, updateSiteByAdmin } from "../../../../actions/siteManagementActions/siteActions";
import ErrorMessage from "../../../../components/ErrorMessage";
import Loading from "../../../../components/Loading";
import swal from "sweetalert";
import "./singleSite.css";
import { API_ENDPOINT } from "../../../../config";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { SITES_UPDATE_BY_ADMIN_AFTER_SUCCESS } from "../../../../constants/siteManagementConstants/siteConstants";

function SingleSiteForAdminScreen({ match, history }) {
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
	const [picMessage, setPicMessage] = useState(null);
	const [moreInfoURL, setMoreInfoURL] = useState("");

	const dispatch = useDispatch();

	const siteUpdateByAdmin = useSelector((state) => state.siteUpdateByAdmin);
	const { loading, error, success } = siteUpdateByAdmin;

	const siteDeleteByAdmin = useSelector((state) => state.siteDeleteByAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = siteDeleteByAdmin;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const resetHandler = () => {
		setSiteName("");
		setCountry("");
		setProvince("");
		setSiteLocation("");
		setPostalCode("");
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

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`${API_ENDPOINT}/sites/admin/get/${match.params.id}`, {
					headers: authHeaderForAdmin(),
				});
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
		}
	}, [match.params.id, adminInfo]);

	const updateHandler = async (e) => {
		e.preventDefault();
		await dispatch(
			updateSiteByAdmin(
				match.params.id,
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
		await dispatch({ type: SITES_UPDATE_BY_ADMIN_AFTER_SUCCESS, payload: null });
		resetHandler();

		swal({
			title: "Success !!!",
			text: "Site Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			history.push("/admin-sites");
		}, 2000);
	};
	if (adminInfo) {
		return (
			<div className="siteEditBg">
				<br></br>
				<MainScreen title={`Edit Site ${siteName}`}>
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
								{loading && <Loading />}
								{success &&
									setTimeout(function () {
										history.push("/admin-sites");
									}, 2000)}
							</div>
							<Row className="SiteContainer">
								<Col md={6}>
									<Form onSubmit={updateHandler}>
										{loadingDelete && <Loading />}
										{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
										{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
										{successDelete && history.push("/admin-sites")}
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
												rows={2}
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
											Update Site
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
								>
									<img
										src={picURL}
										alt={siteName}
										className="profilePic"
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
							<br></br>
						</div>
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

export default SingleSiteForAdminScreen;
