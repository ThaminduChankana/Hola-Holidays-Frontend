import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { sitesListForCustomer } from "../../../../actions/siteManagementActions/siteActions";
import { Grid } from "@material-ui/core/";
import "./sitesLists.css";

const SitesListForCustomerScreen = () => {
	const dispatch = useDispatch();

	const customerSiteList = useSelector((state) => state.customerSiteList);
	const { sites } = customerSiteList;

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const ref = useRef(null);

	const handleClick = () => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		dispatch(sitesListForCustomer());
	}, [dispatch]);

	return (
		<div className="customerSiteList">
			<header className="masthead">
				<div className="container">
					<div className="masthead-subheading">Welcome To Hola Holidays !</div>
					<div className="masthead-heading text-uppercase">It's Nice To Meet You!</div>
					<Link to="/">
						<Button
							size="lg"
							className="homeTellMeMoreBtn"
							style={{
								width: 250,
								height: 70,
								fontSize: 20,
								fontFamily: "cursive",

								borderRadius: 10,
								color: "black",
							}}
							onClick={handleClick}
						>
							Tell Me More
						</Button>
					</Link>
				</div>
			</header>
			<br></br>
			<MainScreen title={`Browse Through The Most Beautiful Places In Sri Lanka ...`}>
				<center>
					<div className="search" style={{ marginTop: 25 }}>
						<Form>
							<input
								type="text"
								placeholder="Search..."
								style={{
									width: "100%",
									height: 40,
									borderRadius: 50,
									paddingInline: "30px",
									paddingLeft: "15px",
									fontSize: 18,
									border: "none",
								}}
								onChange={searchHandler}
							/>
						</Form>
					</div>
				</center>

				<br></br>
				<div>
					<center>
						<Button
							variant="light"
							size="lg"
							onClick={() => {
								setSearch("");
							}}
						>
							All Provinces
						</Button>
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Southern");
							}}
						>
							Southern Province
						</Button>{" "}
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Western");
							}}
						>
							Western Province
						</Button>{" "}
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Northern");
							}}
						>
							Northern Province
						</Button>{" "}
					</center>

					<br></br>
					<center>
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Eastern");
							}}
						>
							Eastern Province
						</Button>
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Sabaragamuwa");
							}}
						>
							Sabaragamuwa Province
						</Button>{" "}
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Uva");
							}}
						>
							Uva Province
						</Button>{" "}
					</center>
				</div>
				<br></br>
				<div>
					<center>
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("Central");
							}}
						>
							Central Province
						</Button>{" "}
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("North-Central");
							}}
						>
							North-Central Province
						</Button>
						&emsp;
						<Button
							variant="dark"
							size="lg"
							onClick={() => {
								setSearch("North-Western");
							}}
						>
							North-Western Province
						</Button>{" "}
					</center>
				</div>

				<br></br>

				<div className="listContainer" ref={ref}>
					{sites &&
						sites
							.filter(
								(filteredSites) =>
									filteredSites.siteName.toLowerCase().includes(search.toLowerCase()) ||
									filteredSites.province.toLowerCase().includes(search.toLowerCase())
							)
							.reverse()
							.map((customerSiteList) => (
								<Grid
									item
									xs={12}
									sm={5}
									md={4}
									key={sites.indexOf(customerSiteList)}
									style={{
										display: "inline-flex",
										width: "auto",
									}}
								>
									<MDBContainer fluid className="my-5">
										<MDBRow className="justify-content-center">
											<MDBCol md="12" lg="6" xl="11">
												<MDBCard
													style={{
														borderRadius: "20px",
														boxShadow: " 10px 10px 5px #f2f3f4",
														backgroundColor: "#f0fff0",
														borderWidth: "5px",
														borderColor: "#10A19D",
														height: "550px",
														width: "340px",
														padding: "5px",
													}}
												>
													<MDBCardImage
														src={customerSiteList.picURL}
														fluid
														className="w-100"
														style={{
															borderRadius: "10px",
															width: "auto",
															height: "300px",
														}}
													/>

													<hr className="my-0" />
													<MDBCardBody className="pb-0">
														<div
															className="d-flex justify-content-between"
															style={{ borderBottom: "2px solid #4880EC", padding: "10px" }}
														>
															<h4>{customerSiteList.siteName}</h4>
														</div>
														<br></br>
														<h6>
															{customerSiteList.siteLocation},<br></br> {customerSiteList.province} province
														</h6>
													</MDBCardBody>
													<hr className="my-0" />
													<MDBCardBody className="pb-0">
														<div className="d-flex justify-content-between align-items-center pb-2 mb-4">
															<Link to={`/customer-site/${customerSiteList._id}`}>
																<Button
																	variant="success"
																	style={{
																		width: "auto",
																		fontSize: "15px",
																		height: "40px",
																		borderRadius: "10px",
																		borderWidth: "5px white",
																		marginLeft: "225px",
																	}}
																>
																	Info
																</Button>
															</Link>
														</div>
													</MDBCardBody>
												</MDBCard>
											</MDBCol>
										</MDBRow>
									</MDBContainer>
								</Grid>
							))}
				</div>

				<br></br>
			</MainScreen>
			<br></br>
			<div className="aboutContainer" ref={ref}>
				<Row>
					<Col style={{ maxWidth: 400 }}>
						<Image
							src="https://res.cloudinary.com/dfmnpw0yp/image/upload/v1683126550/Hola%20Holidays/assets/vrlwm6fde2gb5tl8jkpk.png"
							fluid
							className="w-100"
							style={{
								borderRadius: "10px",
								width: "auto",
								height: "auto",
							}}
						/>
					</Col>
					<Col>
						<p>
							Welcome to <b style={{ color: "orange" }}>Hola Holidays!</b> We are a team of experienced travel
							enthusiasts who are passionate about creating unforgettable holiday experiences for our clients. Our
							mission is to make travel accessible and hassle-free for everyone. We understand that planning a holiday
							can be overwhelming, which is why we offer a wide range of services to cater to all your travel needs.
							Whether you're looking for a romantic getaway, a family vacation, or an adventure-filled trip, we've got
							you covered. Our team of experts will work with you to tailor a package that suits your budget and
							preferences. At Hola Holidays, we value the importance of customer satisfaction. We strive to provide you
							with the best possible service and ensure that your holiday is everything you dreamed of and more. From
							the moment you book with us, we will be with you every step of the way, providing support and guidance to
							make your trip as seamless as possible. We believe that travel is not just about visiting new places, but
							also about immersing yourself in different cultures and creating lasting memories. That's why we offer a
							range of activities and tours that will help you experience the local culture and traditions of your
							destination. Thank you for considering Hola Holidays for your next trip. We look forward to working with
							you and creating the holiday of your dreams!
						</p>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default SitesListForCustomerScreen;
