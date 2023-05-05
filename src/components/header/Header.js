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
						<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }} href="/">
							HOME
						</Button>

						<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }} href="/">
							TOUR GUIDE
						</Button>

						<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }} href="/hotels">
							HOTELS
						</Button>

						<Button variant="" style={{ color: "white", fontSize: "20px", marginLeft: "35px" }} href="/">
							TRANSPORT
						</Button>
						{customerInfo ? (
							<div>
								<Button
									variant=""
									style={{
										color: "white",
										fontSize: "20px",
										marginLeft: "35px",
									}}
									href="/reservations"
								>
									BOOKINGS
								</Button>
							</div>
						) : (
							<></>
						)}
					</ButtonGroup>
				</div>

				{adminInfo || customerInfo ? (
					<></>
				) : (
					<Link to="/">
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
