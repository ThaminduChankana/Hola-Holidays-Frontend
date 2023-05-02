import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { sitesListForCustomer } from "../../../../actions/siteManagementActions/siteActions";
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
			<MainScreen title={`Browse Through The Most Beautiful Places In Sri Lanka..`}>
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
							size="lg"
							onClick={() => {
								setSearch("Southern");
							}}
						>
							Southern Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("Western");
							}}
						>
							Western Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("Northern");
							}}
						>
							Northern Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("Central");
							}}
						>
							Central Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("Eastern");
							}}
						>
							Eastern Province
						</Button>
					</center>

					<br></br>
					<center>
						<Button
							size="lg"
							onClick={() => {
								setSearch("Sabaragamuwa");
							}}
						>
							Sabaragamuwa Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("Uva");
							}}
						>
							Uva Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("North-Western");
							}}
						>
							North-Western Province
						</Button>{" "}
						&emsp;
						<Button
							size="lg"
							onClick={() => {
								setSearch("North-Central");
							}}
						>
							North-Central Province
						</Button>
					</center>
				</div>

				<br></br>

				<div className="listContainer">
					<Accordion allowZeroExpanded>
						{sites &&
							sites
								.filter(
									(filteredSites) =>
										filteredSites.siteName.toLowerCase().includes(search.toLowerCase()) ||
										filteredSites.province.toLowerCase().includes(search.toLowerCase())
								)
								.reverse()
								.map((customerSiteList) => (
									<AccordionItem key={customerSiteList._id} className="listContainer">
										<Card
											style={{
												margin: 10,
												borderRadius: 25,
												borderWidth: 1.0,
												borderColor: "rgb(0,0,0,0.5)",
												marginTop: 20,
												paddingInline: 10,
												background: "rgb(235, 235, 235)",
											}}
										>
											<AccordionItemHeading>
												<AccordionItemButton>
													<Card.Header
														style={{
															display: "flex",
															paddingInline: 10,
															borderRadius: 25,
															marginTop: 10,
															marginBottom: 10,
															borderColor: "black",
															background: "#87a9b1",
														}}
													>
														<span
															style={{
																color: "black",
																textDecoration: "none",
																flex: 1,
																cursor: "pointer",
																alignSelf: "center",
																fontSize: 18,
															}}
														>
															<label
																className="siteName"
																style={{
																	paddingInline: 20,
																	marginTop: 10,
																	fontSize: 18,
																}}
															>
																<b>Site Name :</b> &emsp;
																{customerSiteList.siteName}{" "}
															</label>{" "}
															<br></br>
															<label className="siteCountry" style={{ paddingInline: 20, fontSize: 18 }}>
																<b>Country :</b> &emsp;
																{customerSiteList.country}
															</label>{" "}
															<br></br>
															<label className="siteProvince" style={{ paddingInline: 20, fontSize: 18 }}>
																<b>Province / State :</b> &emsp;
																{customerSiteList.province}
															</label>{" "}
														</span>
													</Card.Header>
												</AccordionItemButton>
											</AccordionItemHeading>
											<AccordionItemPanel>
												<Card.Body>
													<Row>
														<Col md={6}>
															<p>
																<b>Site Name -</b> {customerSiteList.siteName}
															</p>
															<p>
																<b>Located Country -</b> {customerSiteList.country}
															</p>
															<p>
																<b>Located Province -</b> {customerSiteList.province}
															</p>
															<p>
																<b>Site Location -</b> {customerSiteList.siteLocation}
															</p>
															<p>
																<b>Postal Code -</b> {customerSiteList.postalCode}
															</p>
															<p>
																<b>Description -</b> {customerSiteList.description}
															</p>
															<p>
																<b>Recommendations -</b> {customerSiteList.recommendations}
															</p>
															<p>
																<b>Special Events -</b> {customerSiteList.specialEvents}
															</p>
															<p>
																<b>Special Instructions -</b> {customerSiteList.specialInstructions}
															</p>
															<p>
																<b>More Info URL -</b> {customerSiteList.moreInfoURL}
															</p>
															<br></br>
														</Col>
														<Col
															style={{
																display: "flex",
																alignItems: "center",
																width: "100%",
																justifyContent: "center",
															}}
														>
															<img
																style={{
																	width: "75%",
																	height: "auto",
																	borderRadius: 10,
																}}
																src={customerSiteList.picURL}
																alt={customerSiteList.siteName}
																className="sitePic"
															/>
														</Col>
													</Row>
													<br></br>
													<blockquote className="blockquote mb-0">
														<Card.Footer
															className="text-muted"
															style={{
																borderRadius: 20,
																background: "white",
															}}
														/>
													</blockquote>
												</Card.Body>
											</AccordionItemPanel>
										</Card>
									</AccordionItem>
								))}
					</Accordion>
				</div>

				<br></br>
			</MainScreen>
		</div>
	);
};

export default SitesListForCustomerScreen;
