import { useHistory } from "react-router-dom";
import { Accordion, Card, Button, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuideListAction } from "../../actions/TourGuideActions/TourGuideActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./tourguide.css";

export default function TourGuideCustomerViewList() {
	const dispatch = useDispatch();

	const customer_list_Guide = useSelector((state) => state.customer_list_Guide);
	const { loading, Guides, error } = customer_list_Guide;

	console.log(Guides);

	const [search, setSearch] = useState("");

	const searchHandler = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(GuideListAction());
	}, [dispatch, history]);

	return (
		<div className="GuideCustomerBackgroundView">
			<MainScreen>
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
							Guide List
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

				<Button href="/" style={{ float: "left", fontSize: "15px", padding: "10px" }}>
					Back to Dashboard
				</Button>

				<br></br>

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
}
