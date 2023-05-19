import MainScreen from "../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHotelCustomer } from "../../../actions/hotelManagementActions/hotelAction";
import { Grid } from "@material-ui/core/";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBRipple } from "mdb-react-ui-kit";
import "./hotel-view.css";
import "./hotel-home.css";

const CustomerHotelView = () => {
	const dispatch = useDispatch();
	const hotelListCustomer = useSelector((state) => state.hotelListCustomer);
	const { customerHotels } = hotelListCustomer;

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listHotelCustomer());
	}, [dispatch, history.push]);

	return (
		<div className="hotel-customer-view" style={{ minHeight: 700 }}>
			<header className="masthead-hotel">
				<div className="container">
					<div className="masthead-subheading">Welcome To Hola Holidays!</div>
					<div className="masthead-heading text-uppercase">Enjoy your vacation</div>
				</div>
			</header>
			<br></br>
			<MainScreen title="">
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
									border: "2px",
									borderWidth: "5px",
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
							All Resorts
						</Button>
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Nuwara Eliya");
							}}
						>
							Nuwara Eliya
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Colombo");
							}}
						>
							Colombo
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Kandy");
							}}
						>
							Kandy
						</Button>{" "}
					</center>

					<br></br>
					<center>
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Galle");
							}}
						>
							Galle
						</Button>
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Matara");
							}}
						>
							Matara
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Negombo");
							}}
						>
							Negombo
						</Button>{" "}
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Anuradhapura");
							}}
						>
							Anuradhapura
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Badulla");
							}}
						>
							Badulla
						</Button>{" "}
					</center>
				</div>
				<br></br>
				<div>
					<center>
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Hambantota");
							}}
						>
							Hambantota
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Trincomalee");
							}}
						>
							Trincomalee
						</Button>{" "}
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Jaffna");
							}}
						>
							Jaffna
						</Button>
						&emsp;
						<Button
							variant="info"
							size="lg"
							onClick={() => {
								setSearch("Batticaloa");
							}}
						>
							Batticaloa
						</Button>{" "}
					</center>
				</div>
				{customerHotels &&
					customerHotels
						.filter(
							(filteredHotel) =>
								filteredHotel.hotelName.toLowerCase().includes(search.toLowerCase()) ||
								filteredHotel.location.toLowerCase().includes(search.toLowerCase())
						)
						.reverse()

						.map((hotel) => (
							<Grid
								item
								xs={12}
								sm={5}
								md={4}
								key={customerHotels.indexOf(hotel)}
								style={{
									display: "inline-flex",
									width: "600px",
								}}
							>
								<MDBContainer fluid className="my-5">
									<MDBRow className="justify-content-center">
										<MDBCol md="12" lg="6" xl="11">
											<MDBCard
												style={{
													borderRadius: "20px 20px 20px 20px",
													backgroundColor: "#black",
													borderWidth: "5px",
													borderColor: "goldenrod",
													height: "600px",
													width: "340px",
												}}
											>
												<MDBRipple rippleColor="light" rippleTag="div" className="bg-image rounded hover-overlay">
													<MDBCardImage
														src={hotel.pic}
														fluid
														className="w-100"
														style={{
															borderRadius: "15px 15px 0px 0px",
															width: "100px",
															height: "300px",
														}}
													/>
												</MDBRipple>
												<MDBCardBody className="pb-0">
													<div className="d-flex justify-content-between">
														<div>
															<h4 style={{ color: "red" }}>{hotel.hotelName}</h4>
														</div>
													</div>
												</MDBCardBody>
												<hr class="my-0" />
												<MDBCardBody className="pb-0">
													<h5>{hotel.address}</h5>
												</MDBCardBody>
												<hr class="my-0" />
												<MDBCardBody className="pb-0">
													<div className="d-flex justify-content-between align-items-center pb-2 mb-4">
														<Link to={`/hotel-customer-view/${hotel._id}`}>
															<MDBBtn
																style={{
																	paddingRight: "5px",
																	paddingLeft: "5px",
																	width: "80px",
																	backgroundColor: "black",
																	border: "3px solid white",
																	fontSize: "10px",
																	height: "35px",
																	borderRadius: "0px",
																	borderWidth: "5px white",
																}}
															>
																More
															</MDBBtn>
														</Link>
													</div>
												</MDBCardBody>
											</MDBCard>
										</MDBCol>
									</MDBRow>
								</MDBContainer>
							</Grid>
						))}
			</MainScreen>
		</div>
	);
};

export default CustomerHotelView;
