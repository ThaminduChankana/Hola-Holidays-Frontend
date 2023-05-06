import { useHistory } from "react-router-dom";
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
	}, [dispatch, adminInfo,successUpdate, successDelete, history]);
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

					<Button href="/admin" style={{ float: "left", fontSize: "15px", padding: "10px" }}>
						Back to Dashboard
					</Button>

					<Button href="/tour-guide-add" style={{ float: "right", fontSize: "15px", padding: "10px" }}>
						+ Guide Details Create
					</Button>

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
								<Accordion>
									<Card
										style={{
											margin: 10,
											borderRadius: 25,
											borderWidth: 1.0,
											borderColor: "rgb(0,0,0,0.5)",
											marginTop: 20,
											paddingInline: 10,
											background: "#a8e5b5",
										}}
									>
										<Card.Header
											style={{
												display: "flex",
												paddingInline: 10,
												borderRadius: 25,
												marginTop: 10,
												marginBottom: 10,
												borderColor: "black",
												background: "#2596be",
											}}
										>
											<center>
												<h5
													style={{
														fontFamily: "Arial, Helvetica, sans-serif",
														marginTop: "8px",
														fontSize: "25px",
														fontWeight: "bolder",
													}}
												>
													{Guide.location}
												</h5>

												<h5 style={{ marginTop: "10px", fontSize: "25px" }}> {Guide.fee}</h5>
											</center>
											<span
												style={{
													color: "black",
													textDecoration: "none",
													flex: 1,
													cursor: "pointer",
													alignSelf: "center",
													fontSize: 18,
												}}
											></span>
											&emsp;
											<div>
												<Button
													style={{ marginTop: 20, fontSize: 15, borderRadius: 25, borderColor: "black" }}
													variant="success"
													href={`/tour-guide-update/${Guide._id}`}
												>
													Edit
												</Button>
											</div>
											<div>
												<Button
													style={{ marginTop: 20, fontSize: 15, borderRadius: 25, borderColor: "black" }}
													variant="danger"
													className="mx-2"
													onClick={() => deleteHandler(Guide._id)}
												>
													Delete
												</Button>
											</div>
											<br></br>
											<br></br>
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
