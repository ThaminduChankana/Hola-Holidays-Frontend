import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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

	useEffect(() => {
		dispatch(sitesListForCustomer());
	}, [dispatch]);

	return (
		<div className="customerSiteList">
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

				<div className="listContainer">
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

													<hr class="my-0" />
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
													<hr class="my-0" />
													<MDBCardBody className="pb-0">
														<div className="d-flex justify-content-between align-items-center pb-2 mb-4">
															<Button
																variant="success"
																href={`/customer-site/${customerSiteList._id}`}
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
		</div>
	);
};

export default SitesListForCustomerScreen;
