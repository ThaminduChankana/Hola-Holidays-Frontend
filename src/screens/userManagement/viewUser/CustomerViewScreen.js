import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { customerLogout } from "../../../actions/userManagementActions/customerActions";
import "./ViewScreen.css";

const CustomerViewScreen = ({ history }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	useEffect(() => {
		setFirstName(customerInfo.firstName);
		setLastName(customerInfo.lastName);
		setTelephone(customerInfo.telephone);
		setAddress(customerInfo.address);
		setGender(customerInfo.gender);
		setCountry(customerInfo.country);
		setEmail(customerInfo.email);
		setPic(customerInfo.pic);
	}, [customerInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(customerLogout());
		history.push("/");
	};

	if (customerInfo) {
		return (
			<div className="profileViewBg">
				<br></br>
				<MainScreen title="VIEW PROFILE - CUSTOMER">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						onClick={() => history.push("/customer")}
					>
						{" "}
						Back to Dashboard
					</Button>
					<Button
						variant="danger"
						onClick={logoutHandler}
						style={{
							float: "right",
							marginTop: 5,
							fontSize: 15,
							marginRight: 10,
						}}
					>
						Logout
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<br></br>
						<div className="loginContainer">
							<Row className="CustomerProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="customerFirstName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>First Name</Form.Label>
											<Form.Control
												type="name"
												value={firstName}
												placeholder="Enter your first name"
												onChange={(e) => setFirstName(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerLastName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Last Name</Form.Label>
											<Form.Control
												type="name"
												value={lastName}
												placeholder="Enter your last name"
												onChange={(e) => setLastName(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicTelephone">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												placeholder="Enter Telephone Number"
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
												maxLength={10}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicAddress">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												placeholder="Enter  your home address"
												onChange={(e) => setAddress(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicGender">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Gender</Form.Label>
											<Form.Control
												type="textArea"
												value={gender}
												placeholder="Enter  your home address"
												onChange={(e) => setGender(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicCountry">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Country</Form.Label>
											<Form.Control
												type="textArea"
												value={country}
												placeholder="Enter your home country"
												onChange={(e) => setCountry(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicEmail">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Email</Form.Label>
											<Form.Control
												type="email"
												value={email}
												placeholder="Enter  your email address"
												onChange={(e) => setEmail(e.target.value)}
												readOnly
											/>
										</Form.Group>
									</Form>
									<br></br>
									<br></br>
									<Button
										variant="primary"
										onClick={() => history.push("/customer-edit")}
										style={{
											fontSize: 15,
										}}
									>
										Edit profile
									</Button>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={firstName}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
						</div>
						<br></br>
					</Card>
					<br></br>
				</MainScreen>
				<br></br>
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

export default CustomerViewScreen;
