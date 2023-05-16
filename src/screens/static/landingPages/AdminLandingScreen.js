import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { adminLogout } from "../../../actions/userManagementActions/adminActions";
import "./landingScreen.css";
import MainScreen from "../../../components/MainScreen";

const AdminLandingScreen = ({ history }) => {
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(adminLogout());
		history.push("/");
	};

	if (adminInfo) {
		return (
			<div className="adminBackground">
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
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

					<div className="loginContainer">
						<Card
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.8)",
								marginLeft: "10%",
								marginRight: "10%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<div>
									<Link to="/admin-view">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											My Account
										</Button>
									</Link>
									<Link to="/admin-register">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Create New Admin Account
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/admin-customers">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Customer Account Management
										</Button>
									</Link>
									<Link to="/admin-sites">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Site Management
										</Button>
									</Link>
									<br></br>
									<br></br>
									<Link to="/tour-guide-list">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Tour Guide Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/hotels-admin-view">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Hotels Management
										</Button>
									</Link>
									<Link to="/admin-transport">
										<Button
											id="landingBtn"
											variant="success"
											size="lg"
											className="landingbutton"
											style={{ width: 350, height: 75 }}
										>
											Transport Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div></div>
							</div>
							<br></br>
						</Card>
					</div>
				</MainScreen>
				<br></br>
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

export default AdminLandingScreen;
