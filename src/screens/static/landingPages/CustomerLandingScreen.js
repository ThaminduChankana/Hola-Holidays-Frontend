import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { customerLogout } from "../../../actions/userManagementActions/customerActions";
import "./landingScreen.css";
import MainScreen from "../../../components/MainScreen";
import { Link } from "react-router-dom";

const CustomerLandingScreen = ({ history }) => {
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	console.log(customerInfo._id);
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(customerLogout());
		history.push("/");
	};

	if (customerInfo) {
		return (
			<div className="customerBackground">
				<MainScreen title={`Welcome Back ${customerInfo && customerInfo.firstName} ...`}>
					<Button
						variant="danger"
						onClick={logoutHandler}
						className="logoutBtn"
						style={{ float: "right", marginTop: 3, fontSize: 15 }}
					>
						Logout
					</Button>

					<br></br>
					<br></br>
					<br></br>
					<div className="loginContainer">
						<Card
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.8)",
								marginLeft: "20%",
								marginRight: "20%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<Link to="/customer-view">
									<Button id="landingBtn" variant="success" size="lg" style={{ width: 350, height: 75 }}>
										My Account
									</Button>
								</Link>
								<br></br>
								<br></br>
							</div>
							<br></br>
						</Card>
					</div>
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

export default CustomerLandingScreen;
