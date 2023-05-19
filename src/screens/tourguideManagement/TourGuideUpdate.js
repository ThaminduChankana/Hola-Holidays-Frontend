import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GuideDeleteAction, GuideUpdateAction } from "../../actions/TourGuideActions/TourGuideActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { authHeader } from "../../actions/userManagementActions/adminActions";
import MainScreen from "../../components/MainScreen";
import { API_ENDPOINT } from "../../config";
import { TOUR_GUIDE_UPDATE_AFTER_SUCCESS } from "../../constants/TourGuideConstants/TourGuideConstants";

export default function TourGuideUpdate({ match, history }) {
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

	const Guide_Update = useSelector((state) => state.Guide_Update);
	const { loading, error } = Guide_Update;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(GuideDeleteAction(id));
		}
		history.push("/");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/guide/admin/get/${match.params.id}`, {
				headers: authHeader(),
			});

			setName(data.name);
			setGender(data.gender);
			setLanguage(data.language);
			setLocation(data.location);
			setDescription(data.description);
			setFee(data.fee);
			setPhoneNumber(data.phoneNumber);
			console.log(data);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = async (e) => {
		e.preventDefault();

		dispatch(GuideUpdateAction(match.params.id, name, gender, language, location, description, fee, phoneNumber));
		if (!name || !gender || !language || !location || !location || !description || !fee || !phoneNumber) return;

		await dispatch({ type: TOUR_GUIDE_UPDATE_AFTER_SUCCESS, payload: null });
		history.push("/tour-guide-list");
	};

	if (adminInfo) {
		return (
			<div className="GuideBackgroundUpdate">
				{" "}
				<MainScreen title={"UPDATE GUIDE DETAILS"}>
					<Link to="/tour-guide-list">
						<Button
							variant="success"
							style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }}
							size="lg"
						>
							Back to Guide List
						</Button>
					</Link>

					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "10%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<br></br>

						<Card.Body>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								<Form.Group controlId="guidename">
									<Form.Label>Tour Guide Name</Form.Label>
									<Form.Control type="guidename" value={name} onChange={(e) => setName(e.target.value)} />
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
									<Form.Label>location</Form.Label>
									<Form.Control value={location} onChange={(e) => setLocation(e.target.value)} />
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>description</Form.Label>
									<Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
								</Form.Group>

								<Form.Group controlId="fee">
									<Form.Label>fee</Form.Label>
									<Form.Control type="fee" value={fee} onChange={(e) => setFee(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="phoneNumber">
									<Form.Label>phoneNumber</Form.Label>
									<Form.Control
										type="phoneNumberphoneNumber"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</Form.Group>
								<br></br>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary">
									Submit
								</Button>
								<Button className="mx-2" variant="danger" onClick={() => deleteHandler(match.params.id)}>
									Delete
								</Button>
							</Form>
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
