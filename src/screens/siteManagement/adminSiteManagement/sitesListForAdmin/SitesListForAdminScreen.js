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
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSiteByAdmin, sitesListForAdmin } from "../../../../actions/siteManagementActions/siteActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./sitesLists.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const SitesListForAdminScreen = () => {
	const dispatch = useDispatch();

	const adminSiteList = useSelector((state) => state.adminSiteList);
	const { loading, sites, error } = adminSiteList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const siteCreate = useSelector((state) => state.siteCreate);
	const { success: successCreate } = siteCreate;

	const siteUpdateByAdmin = useSelector((state) => state.siteUpdateByAdmin);
	const { success: successUpdate } = siteUpdateByAdmin;

	const [search, setSearch] = useState("");

	const siteDeleteByAdmin = useSelector((state) => state.siteDeleteByAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = siteDeleteByAdmin;

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(deleteSiteByAdmin(id));
				swal({
					title: "Success!",
					text: "Deleted Site Successfully",
					icon: "success",
					timer: 2000,
					button: false,
				});
			}
		});
	};
	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(sitesListForAdmin());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);
	if (adminInfo) {
		return (
			<div className="adminSiteList">
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "azure",
									fontStyle: "italic",
								}}
							>
								Sites List For Admin
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form>
									<input
										type="text"
										placeholder="Search..."
										style={{
											width: 400,
											height: 40,
											borderRadius: 50,
											padding: "10px",
											paddingLeft: "15px",
											fontSize: 18,
											border: "none",
										}}
										onChange={searchHandler}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>
					<Link to="/admin">
						<Button variant="success" style={{ float: "left", fontSize: "15px" }}>
							Back to Dashboard
						</Button>
					</Link>
					<Link to="/admin-site-create">
						<Button variant="success" style={{ float: "right", fontSize: "15px" }}>
							+ Add A New Site
						</Button>
					</Link>
					<br></br>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loading && <Loading />}
					{loadingDelete && <Loading />}
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
									.map((adminSiteList) => (
										<AccordionItem key={adminSiteList._id} className="listContainer">
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
																	{adminSiteList.siteName}{" "}
																</label>{" "}
																<br></br>
																<label className="siteCountry" style={{ paddingInline: 20, fontSize: 18 }}>
																	<b>Country :</b> &emsp;
																	{adminSiteList.country}
																</label>{" "}
																<br></br>
																<label className="siteProvince" style={{ paddingInline: 20, fontSize: 18 }}>
																	<b>Province / State :</b> &emsp;
																	{adminSiteList.province}
																</label>{" "}
															</span>
															<div>
																<Link to={`/admin-site-edit/${adminSiteList._id}`}>
																	<Button style={{ marginTop: 40, fontSize: 15 }}>Edit</Button>
																</Link>
															</div>
															&emsp;
															<div>
																<Button
																	style={{ marginTop: 40, fontSize: 15 }}
																	variant="danger"
																	className="mx-2"
																	onClick={() => deleteHandler(adminSiteList._id)}
																>
																	Delete
																</Button>
															</div>
														</Card.Header>
													</AccordionItemButton>
												</AccordionItemHeading>
												<AccordionItemPanel>
													<Card.Body>
														<Row>
															<Col md={6}>
																<p>
																	<b>Site Name -</b> {adminSiteList.siteName}
																</p>
																<p>
																	<b>Located Country -</b> {adminSiteList.country}
																</p>
																<p>
																	<b>Located Province -</b> {adminSiteList.province}
																</p>
																<p>
																	<b>Site Location -</b> {adminSiteList.siteLocation}
																</p>
																<p>
																	<b>Postal Code -</b> {adminSiteList.postalCode}
																</p>
																<p>
																	<b>Description -</b> {adminSiteList.description}
																</p>
																<p>
																	<b>Recommendations -</b> {adminSiteList.recommendations}
																</p>
																<p>
																	<b>Special Events -</b> {adminSiteList.specialEvents}
																</p>
																<p>
																	<b>Special Instructions -</b> {adminSiteList.specialInstructions}
																</p>
																<p>
																	<b>More Info URL -</b> {adminSiteList.moreInfoURL}
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
																	src={adminSiteList.picURL}
																	alt={adminSiteList.siteName}
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
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
};

export default SitesListForAdminScreen;
