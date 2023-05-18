import { Button, Card } from "react-bootstrap";
import "./loginsignup.css";
import MainScreen from "../../../components/MainScreen";
import { Link } from "react-router-dom";

const LoginSignUpScreen = ({ history }) => {
	return (
		<div className="loginsignupBackground">
			<MainScreen title={`Choose Action ...`}>
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
							<Link to="/customer-login">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Login
								</Button>
							</Link>
							<br></br>
							<br></br>
							<Link to="/customer-register">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Register
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
};

export default LoginSignUpScreen;
