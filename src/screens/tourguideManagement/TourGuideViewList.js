import { useHistory, Link } from "react-router-dom";
import { Accordion, Card, Button, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuideDeleteAction, GuideListAction } from "../../actions/TourGuideActions/TourGuideActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./tourguide.css";
import swal from "sweetalert";

export default function TourGuideViewList() {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const list_Guide = useSelector((state) => state.list_Guide);
	const { loading, Guides, error } = list_Guide;

	const Guide_Update = useSelector((state) => state.Guide_Update);
	const { success: successUpdate } = Guide_Update;

	const Guide_Delete = useSelector((state) => state.Guide_Delete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = Guide_Delete;
	console.log(Guides);

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};
	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(GuideDeleteAction(id));
					swal({
						title: "Success!",
						text: "Deleted Guide Details Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/tour-guide-list");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Guide Details",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(GuideListAction());
	}, [dispatch, adminInfo, successUpdate, successDelete, history]);
	if (adminInfo) {
		return (
			<div className="GuideBackgroundView">
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Row>
						<Col>
							<h1
								style={{
									display: "flex",
									marginLeft: "10px",
									width: "500px",
									color: "black",
									fontStyle: "italic",
								}}
							>
								Guide Details List
							</h1>
						</Col>
						<Col>
							<div className="search" style={{ marginTop: 5, marginLeft: 150 }}>
								<Form inline>
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
										}}
										onChange={searchHandler}
									/>
								</Form>
							</div>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<Link to="/admin">
						<Button
							id="adminbtn"
							style={{
								float: "left",
								fontSize: "15px",
								padding: "10px",
								borderRadius: "1500px",
								background: "#4CAF50",
								color: "white",
								textDecoration: "none",
								border: "none",
								marginRight: "10px",
							}}
						>
							Back to Dashboard
						</Button>
					</Link>

					<Link to="/tour-guide-add">
						<Button
							id="guideaddbtn"
							style={{
								float: "right",
								fontSize: "15px",
								padding: "10px",
								borderRadius: "1500px",
								background: "#2596be",
								color: "white",
								textDecoration: "none",
								border: "none",
							}}
						>
							+ Guide Details Create
						</Button>
					</Link>

					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>

					{Guides &&
						Guides.filter(
							(filteredGuides) =>
								filteredGuides.location.toLowerCase().includes(search.toLowerCase()) ||
								filteredGuides.fee.includes(search)
						)
							.reverse()
							.map((Guide) => (
								<Accordion
									style={{ marginTop: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "25px" }}
								>
									<Card className="mb-3" style={{ borderRadius: "25px" }}>
										<Card.Header
											className="d-flex align-items-center bg-info text-white"
											style={{
												borderRadius: "25px",
												margin: 10,
												borderColor: "rgb(0,0,0,0.5)",
												padding: "20px",
											}}
										>
											<div>
												<h5 className="mb-0">{Guide.location}</h5>
												<h5 className="mb-0">{Guide.fee}</h5>
											</div>
											<div className="ml-auto">
												<Link to={`/tour-guide-update/${Guide._id}`}>
													<Button className="mr-2" style={{ borderRadius: "25px" }}>
														Edit
													</Button>
												</Link>
												<Button
													variant="danger"
													className="mr-2"
													onClick={() => deleteHandler(Guide._id)}
													style={{ borderRadius: "25px" }}
												>
													Delete
												</Button>
											</div>
										</Card.Header>

										<Card.Body>
											<Row>
												<Col md={8}>
													<h5> name : {Guide.name}</h5>
													<h5> gender : {Guide.gender}</h5>
													<h5> location : {Guide.location}</h5>
													<h5> description : {Guide.description}</h5>
													<h5> language : {Guide.language}</h5>
													<h5> fee : {Guide.fee}</h5>
													<h5> telephone : {Guide.phoneNumber}</h5>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								</Accordion>
							))}
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
