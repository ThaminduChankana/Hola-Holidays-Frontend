import { useHistory } from "react-router-dom";
import { Accordion, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerGuideListAction } from "../../actions/TourGuideActions/TourGuideActions";
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
		dispatch(CustomerGuideListAction());
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
							Tour Guides List
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
								key={Guide.id}
								style={{ marginTop: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "25px" }}
							>
								<Card
									className="mb-3"
									style={{
										borderRadius: "25px",
										background: "#d6e2eb",
									}}
								>
									<Card.Header
										className="d-flex align-items-center bg-info text-white"
										style={{
											borderRadius: "25px",
											margin: 10,
											padding: "20px",
										}}
									>
										<div>
											<h5 className="mb-0">{Guide.location}</h5>
											<h5 className="mb-0">{Guide.fee}</h5>
										</div>
									</Card.Header>

									<Card.Body>
										<Row>
											<Col md={8}>
												<h5> Name : {Guide.name}</h5>
												<h5> Gender : {Guide.gender}</h5>
												<h5> Location : {Guide.location}</h5>
												<h5> Description : {Guide.description}</h5>
												<h5> Language : {Guide.language}</h5>
												<h5> Fee : {Guide.fee}</h5>
												<h5> Telephone : {Guide.phoneNumber}</h5>
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
