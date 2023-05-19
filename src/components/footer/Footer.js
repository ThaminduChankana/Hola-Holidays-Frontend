import React from "react";
import "./footer.css";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footerBox">
			<Row>
				<Col style={{ maxWidth: 400 }}>
					<Image
						src="https://res.cloudinary.com/dfmnpw0yp/image/upload/v1683126550/Hola%20Holidays/assets/vrlwm6fde2gb5tl8jkpk.png"
						fluid
						style={{
							borderRadius: "10px",
							width: "50%",
							height: "auto",
						}}
					/>
				</Col>
				<Col>
					<h4>QUICK LINKS</h4>
					<li className="list-unstyled">
						<Link to="/" id="listElement">
							Home
						</Link>
						<br></br>
						<Link to="/aboutus" id="listElement">
							About Us
						</Link>
						<br></br>
						<Link to="/map" id="listElement">
							Map
						</Link>
						<br></br>
					</li>
				</Col>
				<Col>
					<h4>POPULAR LINKS</h4>
					<li className="list-unstyled">
						<Link to="/contactus" id="listElement">
							Contact Us
						</Link>

						<br></br>
						<Link to="/admin-login" id="listElement">
							Sign In
						</Link>
						<br></br>
						<Link to="/" id="listElement">
							Terms And Conditions
						</Link>
					</li>
				</Col>
				<Col>
					<h4>CONTACT</h4>
					<ul className="list-unstyled">
						<li id="listElement">ADDRESS : Hola Holidays Travels and Tourism, Galle Road, Colombo</li>
						<br></br>
						<li id="listElement">PHONE : 077 7785441</li>
						<li id="listElement">EMAIL : holaholidays@gmail.com</li>
					</ul>
				</Col>
			</Row>

			<hr style={{ backgroundColor: "white" }} />

			<center>
				<p>
					&copy;{new Date().getFullYear()} site by DreamSeers &emsp; | &emsp; Hola Holidays &emsp; | &emsp; @ All rights
					reserved &emsp;
				</p>
			</center>
		</div>
	);
};

export default Footer;
