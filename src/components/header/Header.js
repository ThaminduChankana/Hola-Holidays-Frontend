import React from "react";
import "./header.css";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	return (
		<div className="Navbar">
			<div className="leftSide">
				<img
					style={{ width: "53%", height: "auto", marginLeft: "40px", marginTop: "40px", borderRadius: "10px" }}
					src="https://res.cloudinary.com/dfmnpw0yp/image/upload/v1683126550/Hola%20Holidays/assets/vrlwm6fde2gb5tl8jkpk.png"
					alt=""
				/>
			</div>
			<div className="rightSide">
				<div className="links">
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%", marginTop: "2%" }}>
						<Link to="/">
							<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }}>
								HOME
							</Button>
						</Link>
						<Link to="/map">
							<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }}>
								MAPS
							</Button>
						</Link>
						<Link to="/tour-guide-customer-list">
							<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }}>
								TOUR GUIDE
							</Button>
						</Link>
						<Link to="/hotels">
							<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }}>
								HOTELS
							</Button>
						</Link>
						<Link to="/customer-transport">
							<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }}>
								TRANSPORT
							</Button>
						</Link>
						{customerInfo ? (
							<div>
								<Link to="/reservations">
									<Button
										variant=""
										style={{
											color: "white",
											fontSize: "20px",
											marginLeft: "35px",
										}}
									>
										BOOKINGS
									</Button>
								</Link>
							</div>
						) : (
							<></>
						)}
					</ButtonGroup>
				</div>

				{adminInfo || customerInfo ? (
					<></>
				) : (
					<Link to="/login-signup">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "goldenrod",
								borderBlockColor: "white",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Sign In / Sign Up
						</Button>
					</Link>
				)}
				{adminInfo ? (
					<Link to="/admin">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "goldenrod",
								borderBlockColor: "white",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Dashboard
						</Button>
					</Link>
				) : (
					<></>
				)}
				{customerInfo ? (
					<Link to="/customer">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "150px",
								backgroundColor: "goldenrod",
								borderBlockColor: "white",
								color: "#000000",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Dashboard
						</Button>
					</Link>
				) : (
					<></>
				)}
			</div>
			<br />
		</div>
	);
}

export default Header;
