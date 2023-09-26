import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { adminUpdateProfile } from "../../../actions/userManagementActions/adminActions";
import "./EditScreen.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { ADMIN_UPDATE_AFTER_SUCCESS } from "../../../constants/userManagementConstants/adminConstants";

const AdminEditScreen = () => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const history = useHistory();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const adminUpdate = useSelector((state) => state.adminUpdate);
	const { loading, error, success } = adminUpdate;

	useEffect(() => {
		setName(adminInfo.name);
		setTelephone(adminInfo.telephone);
		setAddress(adminInfo.address);
		setEmail(adminInfo.email);
		setPic(adminInfo.pic);
	}, [adminInfo]);

	const resetHandler = async (e) => {
		e.preventDefault();

		setName("");
		setTelephone("");
		setAddress("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setMessage(null);
		setPic("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
		setPicMessage(null);
	};

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "adminProfile");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			const adminUpdatedInfo = {
				name,
				telephone,
				address,
				email,
				pic,
				password,
			};
			await dispatch(adminUpdateProfile(adminUpdatedInfo));

			setTimeout(function () {
				history.push("/admin-view");
			}, 2000);

			await dispatch({ type: ADMIN_UPDATE_AFTER_SUCCESS, payload: null });

			resetHandler();
		}
	};

	if (adminInfo) {
		return (
			<div className="editBg">
				<MainScreen title="EDIT - ADMIN">
					<Link to="/admin">
						<Button
							variant="success"
							style={{
								float: "left",
								marginTop: 5,
								fontSize: 15,
							}}
						>
							{" "}
							Back to Dashboard
						</Button>
					</Link>
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
						<div className="loginContainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
								{success &&
									setTimeout(function () {
										history.push("/admin-view");
									}, 2000)}
							</div>
							<br></br>
							<Row className="AdminProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="adminViewName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
											></Form.Control>
										</Form.Group>
										<br></br>
										<Form.Group controlId="adminFormBasicTelephone">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="adminFormBasicAddress">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="adminFormBasicEmail">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
										</Form.Group>
										<br></br>
										<Form.Group controlId="formBasicPassword">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Password</Form.Label>
											<Form.Control
												type="password"
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="confirmPassword">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Confirm Password</Form.Label>
											<Form.Control
												type="password"
												value={confirmpassword}
												placeholder="Confirm Password"
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Profile Picture</Form.Label>
											&emsp;
											<input
												type="file"
												accept="image/*"
												id="admin-pic"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</Form.Group>
										<br></br>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={resetHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Reset
										</Button>
									</Form>
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
							<br></br>
						</div>
					</Card>
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

export default AdminEditScreen;
