import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customerDeleteProfileById, customersList } from "../../../../actions/userManagementActions/customerActions";
import Loading from "../../../../components/Loading";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./userLists.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const CustomerListForAdminScreen = () => {
	const dispatch = useDispatch();

	const customerList = useSelector((state) => state.customerList);
	const { loading, customers, error } = customerList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const customerUpdate = useSelector((state) => state.customerUpdate);
	const { success: successUpdate } = customerUpdate;

	const customerDeleteById = useSelector((state) => state.customerDeleteById);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = customerDeleteById;

	const history = useHistory();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(customersList());
		if (!adminInfo) {
			history.push("/access-denied", { replace: true });
		}
	}, [dispatch, history, adminInfo, customerDeleteById, successDelete, successUpdate]);

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(customerDeleteProfileById(id));

				swal({
					title: "Success!",
					text: "Deleted Account Successfully",
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

	if (adminInfo) {
		return (
			<div className="customerList">
				<br></br>
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "100%",
									color: "azure",
									fontStyle: "italic",
								}}
							>
								Customers List
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form>
									<input
										type="text"
										placeholder="Search..."
										style={{
											width: "100%",
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
						<Button variant="success">Back to Dashboard</Button>
					</Link>
					<br></br>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loading && <Loading />}
					{loadingDelete && <Loading />}
					<br></br>
					<div className="listContainer">
						<Accordion allowZeroExpanded>
							{customers &&
								customers
									.filter(
										(filteredCustomers) =>
											filteredCustomers.firstName.toLowerCase().includes(search.toLowerCase()) ||
											filteredCustomers.email.includes(search)
									)
									.reverse()
									.map((customerList) => (
										<AccordionItem key={customerList._id} className="listContainer">
											<Card
												style={{
													margin: 10,
													borderRadius: 25,
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
																background: "#17BEBB",
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
																	className="name"
																	style={{
																		paddingInline: 20,
																		marginTop: 10,
																		fontSize: 18,
																	}}
																>
																	<b>Customer Name :</b> &emsp;
																	{customerList.firstName} {customerList.lastName}
																</label>{" "}
																<br></br>
																<label className="email" style={{ paddingInline: 20, fontSize: 18 }}>
																	<b>Customer Email :</b> &emsp;
																	{customerList.email}{" "}
																</label>{" "}
															</span>
															<div>
																<Link to={`/admin-customer-edit/${customerList._id}`}>
																	<Button style={{ marginTop: 20, fontSize: 15 }}>Edit</Button>
																</Link>
															</div>
															&emsp;
															<div>
																<Button
																	style={{ marginTop: 20, fontSize: 15 }}
																	variant="danger"
																	className="mx-2"
																	onClick={() => deleteHandler(customerList._id)}
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
																<h5>
																	Name - {customerList.firstName} {customerList.lastName}{" "}
																</h5>
																<h5>Telephone - {customerList.telephone}</h5>
																<h5>Address - {customerList.address}</h5>
																<h5>Gender - {customerList.gender}</h5>
																<h5>Country - {customerList.country}</h5>
																<h5>Email - {customerList.email}</h5>
																<br></br>
															</Col>
															<Col
																style={{
																	display: "flex",
																	alignItems: "center",
																	width: "500px",
																	justifyContent: "center",
																}}
															>
																<img
																	style={{
																		width: "50%",
																		height: "100%",
																	}}
																	src={customerList.pic}
																	alt={customerList.name}
																	className="profilePic"
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
															>
																Registered Date - <cite title="Source Title"> {customerList.regDate}</cite>
															</Card.Footer>
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

export default CustomerListForAdminScreen;
