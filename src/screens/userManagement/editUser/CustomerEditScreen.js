import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import { customerUpdateProfile, customerDeleteProfile } from "../../../actions/userManagementActions/customerActions";
import swal from "sweetalert";
import "./EditScreen.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const CustomerEditScreen = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const customerUpdate = useSelector((state) => state.customerUpdate);
	const { loading, error, successUpdate } = customerUpdate;

	const customerDelete = useSelector((state) => state.customerDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = customerDelete;

	useEffect(() => {
		setFirstName(customerInfo.firstName);
		setLastName(customerInfo.lastName);
		setGender(customerInfo.gender);
		setTelephone(customerInfo.telephone);
		setAddress(customerInfo.address);
		setCountry(customerInfo.country);
		setEmail(customerInfo.email);
		setPic(customerInfo.pic);
	}, [customerInfo, customerDelete, successDelete, loadingDelete, errorDelete]);

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "customerProfile");
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
			const customerUpdatedInfo = {
				firstName,
				lastName,
				telephone,
				address,
				gender,
				country,
				email,
				password,
				pic,
			};
			dispatch(customerUpdateProfile(customerUpdatedInfo));
			setFirstName("");
			setLastName("");
			setTelephone("");
			setAddress("");
			setGender("");
			setCountry("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setPic("");
			setMessage(null);
		}
	};

	const history = useHistory();

	const deleteHandler = (customerInfo) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(customerDeleteProfile(customerInfo));

				swal({
					title: "Success!",
					text: "Deleted Account Successfully",
					icon: "success",
					timer: 2000,
					button: false,
				});

				setTimeout(function () {
					history.push("/");
				}, 1500);
			}
		});
	};

	if (customerInfo) {
		return (
			<div className="editBg">
				<MainScreen title="EDIT - CUSTOMER">
					<Link to="/customer">
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
								{successUpdate &&
									setTimeout(function () {
										history.push("/customer-view")
									}, 2000)}
							</div>
							<br></br>
							<Row className="CustomerProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="customerFirstName">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>First Name</Form.Label>
											<Form.Control
												type="name"
												value={firstName}
												placeholder="Enter your first name"
												onChange={(e) => setFirstName(e.target.value)}
												required
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
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicTelephone">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												placeholder="Enter Telephone Number With Country Code"
												onChange={(e) => setTelephone(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="customerFormBasicAddress">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Address</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
													padding: "5px",
													border: "none",
												}}
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												placeholder="Enter your address"
												required
												rows={2}
											/>
										</Form.Group>
										<br></br>
										<div className="form-group">
											<label className="customerGender" style={{ fontWeight: "bold", fontStyle: "italic" }}>
												Gender
											</label>
											<select
												className="form-control"
												id="customerGender"
												value={gender}
												onChange={(e) => setGender(e.target.value)}
												required
											>
												<option>Select Gender</option>
												<option value={gender.Male}>Male</option>
												<option value={gender.Female}>Female</option>
											</select>
										</div>
										<br></br>
										<Form.Group controlId="customerFormBasicCountry">
											<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Country</Form.Label>
											<Form.Control
												type="textArea"
												value={country}
												placeholder="Enter your home country"
												onChange={(e) => setCountry(e.target.value)}
												required
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
												required
											/>
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
												id="customer-pic"
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
											onClick={deleteHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Delete
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

export default CustomerEditScreen;
