import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { adminLogout } from "../../../actions/userManagementActions/adminActions";
import "./ViewScreen.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminViewScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	useEffect(() => {
		setName(adminInfo.name);
		setTelephone(adminInfo.telephone);
		setAddress(adminInfo.address);
		setEmail(adminInfo.email);
		setPic(adminInfo.pic);
	}, [adminInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(adminLogout());
		history.push("/");
	};

	if (adminInfo) {
		return (
			<div className="profileViewBg">
				<br></br>
				<MainScreen title="VIEW PROFILE - ADMIN">
					<Link to="/admin">
						<Button
							variant="success"
							style={{
								float: "left",
								marginTop: 5,
								fontSize: 15,
								marginLeft: 10,
							}}
						>
							{" "}
							Back to Dashboard
						</Button>
					</Link>
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
							<Row className="AdminProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="adminViewName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												readOnly
											></Form.Control>
										</Form.Group>
										<br></br>

										<Form.Group controlId="adminFormBasicTelephone">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="adminFormBasicAddress">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="adminFormBasicEmail">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
										</Form.Group>
									</Form>
									<br></br>
									<br></br>
									<Button
										variant="primary"
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
										alt={name}
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

export default AdminViewScreen;
