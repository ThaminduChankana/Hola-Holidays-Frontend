import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { GuideAddAction } from "../../actions/TourGuideActions/TourGuideActions";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./tourguide.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { TOUR_GUIDE_ADD_AFTER_SUCCESS } from "../../constants/TourGuideConstants/TourGuideConstants";

export default function TourGuideAdd({ match }) {
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [language, setLanguage] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [fee, setFee] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const Guide_Details_Create = useSelector((state) => state.Guide_Details_Create);
	const { loading, error } = Guide_Details_Create;

	const resetHandler = () => {
		setName("");
		setGender("");
		setLocation("");
		setDescription("");
		setLanguage("");
		setFee("");
		setPhoneNumber("");
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (!name || !gender || !language || !location || !description || !fee || !phoneNumber)
			// const sendingData = { name, gender, language, location, description, fee, phoneNumber };
			// console.log(sendingData);
			return;
		dispatch(await GuideAddAction(name, gender, language, location, description, fee, phoneNumber));
		await dispatch({ TOUR_GUIDE_ADD_AFTER_SUCCESS, payload: null });
		resetHandler();
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setName("Gregory Pink");
		setGender("");
		setLocation("Galle");
		setDescription("I will provide you a perfect tour at beautiful galle fort");
		setLanguage("");
		setFee("20$-35$/hr");
		setPhoneNumber("0112334565");
	};

	if (adminInfo) {
		return (
			<div className="GuardBackgroundCreate">
				<MainScreen title={"Enter Tour Guide Info"}>
					<Link to="/tour-guide-list">
						<Button
							variant="success"
							style={{
								marginLeft: 10,
								marginBottom: 6,
								float: "left",
								fontSize: 15,
							}}
							size="lg"
						>
							Back to the Tour guides List
						</Button>
					</Link>

					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "0%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<Card.Body>
							<br></br>

							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								<Form.Group controlId="guidename">
									<Form.Label
										style={{
											paddingTop: 10,
										}}
									>
										Tour Guide's Name
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 15,
										}}
										type="guidename"
										placeholder="Enter name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="gender">
									<Form.Label style={{ paddingTop: 10 }}>Gender</Form.Label>
									<div>
										<Form.Check
											inline
											label="Female"
											type="radio"
											id="female"
											checked={gender === "female"}
											onChange={() => setGender("female")}
										/>
										<Form.Check
											inline
											label="Male"
											type="radio"
											id="male"
											checked={gender === "male"}
											onChange={() => setGender("male")}
										/>
									</div>
								</Form.Group>
								<Form.Group controlId="language">
									<Form.Label style={{ paddingTop: 10 }}>Language:</Form.Label>
									<div>
										<Form.Check
											type="checkbox"
											label="English"
											checked={language === "English"}
											onChange={() => setLanguage("English")}
										/>
										<Form.Check
											type="checkbox"
											label="Spanish"
											checked={language === "Spanish"}
											onChange={() => setLanguage("Spanish")}
										/>
										<Form.Check
											type="checkbox"
											label="French"
											checked={language === "French"}
											onChange={() => setLanguage("French")}
										/>
										<Form.Check
											type="checkbox"
											label="German"
											checked={language === "German"}
											onChange={() => setLanguage("German")}
										/>
									</div>
								</Form.Group>

								<Form.Group controlId="location">
									<Form.Label
										style={{
											paddingTop: 10,
										}}
									>
										location
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 15,
										}}
										value={location}
										placeholder="enter Location"
										onChange={(e) => setLocation(e.target.value)}
										required
									/>

									<Form.Group controlId="description">
										<Form.Label
											style={{
												paddingTop: 10,
											}}
										>
											description
										</Form.Label>
										<Form.Control
											as="textarea"
											type="description"
											value={description}
											placeholder="enter description"
											onChange={(e) => setDescription(e.target.value)}
											required
										/>
									</Form.Group>
								</Form.Group>
								<Form.Group controlId="fee">
									<Form.Label
										style={{
											paddingTop: 10,
										}}
									>
										Fee
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 15,
										}}
										type="fee"
										value={fee}
										placeholder="enter fee"
										onChange={(e) => setFee(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="phoneNumber">
									<Form.Label
										style={{
											paddingTop: 10,
										}}
									>
										telephone
									</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 15,
										}}
										type="phoneNumber"
										value={phoneNumber}
										placeholder="enter telephone"
										onChange={(e) => setPhoneNumber(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="success">
									Submit
								</Button>
								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
								<Button variant="info" onClick={demoHandler}>
									Demo
								</Button>
							</Form>
							<br></br>
						</Card.Body>
					</Card>
					<br></br>
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
}
