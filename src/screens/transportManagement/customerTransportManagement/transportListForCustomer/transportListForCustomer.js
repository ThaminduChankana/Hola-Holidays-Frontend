import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transportListForCustomer } from "../../../../actions/transportManagementActions/transportActions";
import "./BusDetails.css";

function TransportListForCustomers() {
	const dispatch = useDispatch();

	const customerTransportList = useSelector((state) => state.customerTransportList);
	const { transport } = customerTransportList;

	useEffect(() => {
		dispatch(transportListForCustomer());
	}, [dispatch]);

	const [startingStation, setStartingStation] = useState("");
	const [selectedLeavingTime, setSelectedLeavingTime] = useState("");

	const handleStartingStationChange = (event) => {
		setStartingStation(event.target.value);
	};

	const handleLeavingTimeChange = (event) => {
		setSelectedLeavingTime(event.target.value);
	};

	const filteredTransport =
		transport &&
		transport.filter((customerTransportList) => {
			return (
				customerTransportList.startingStation.toLowerCase().startsWith(startingStation.toLowerCase()) &&
				(selectedLeavingTime === "" || customerTransportList.leavingTime === selectedLeavingTime)
			);
		});

	return (
		<div className="mainD">
			<br />
			<br />
			<h1 style={{ marginLeft: "70px", fontSize: "36px", fontWeight: "bold", fontFamily: "Arial" }}>
				Public Transportation - Bus
			</h1>{" "}
			<hr />
			<div className="d-flex justify-content-between align-items-center">
				<div className="col-md-5" style={{ marginLeft: "200px" }}>
					<div className="form-group">
						<input
							type="text"
							className="form-control rounded-pill"
							id="startingStation"
							placeholder="Search by Starting Station"
							value={startingStation}
							onChange={handleStartingStationChange}
						/>
					</div>
				</div>
				<div className="form-group" style={{ marginRight: "300px" }}>
					<select
						className="form-control rounded-pill"
						id="leavingTime"
						value={selectedLeavingTime}
						onChange={handleLeavingTimeChange}
						style={{ width: "250px" }}
					>
						<option value="">Select Bus Leaving Time</option>
						<option value="5AM">5AM</option>
						<option value="6AM">6AM</option>
						<option value="7AM">7AM</option>
						<option value="8AM">8AM</option>
						<option value="9AM">9AM</option>
						<option value="10AM">10AM</option>
						<option value="11AM">11AM</option>
						<option value="12PM">12PM</option>
						<option value="1PM">1PM</option>
						<option value="2PM">2PM</option>
						<option value="3PM">3PM</option>
						<option value="4PM">4PM</option>
						<option value="5PM">5PM</option>
						<option value="6PM">6PM</option>
						<option value="7PM">7PM</option>
						<option value="8PM">8PM</option>
						<option value="9PM">9PM</option>
						<option value="10PM">10PM</option>
						<option value="11PM">11PM</option>
						<option value="12AM">12AM</option>
					</select>
				</div>
			</div>
			<div className="row">
				{filteredTransport &&
					filteredTransport.map((customerTransportList) => (
						<div key={customerTransportList._id} className="bus-detail-box">
							<h3>Vehicle Number: {customerTransportList.licensePlate}</h3> <br />
							<div className="column-left">
								<p>
									<span style={{ fontWeight: "bold" }}>Starting Station:</span> {customerTransportList.startingStation}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Destination Station: </span>
									{customerTransportList.destinationStation}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Mobile Number: </span>
									{customerTransportList.mobileNo}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Leaving Time: </span>
									{customerTransportList.leavingTime}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Total Travel Time: </span>
									{customerTransportList.totalTravelTime}
								</p>
							</div>
							<div className="column-right">
								<p>
									<span style={{ fontWeight: "bold" }}>Facilities : </span>
									{customerTransportList.facilities.join(", ")}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>City Stops : </span>
									{customerTransportList.cityStops.join(", ")}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Total Number Of Seats: </span>
									{customerTransportList.totalNumberOfSeats}
								</p>
								<p>
									<span style={{ fontWeight: "bold" }}>Ticket Price (LKR):</span>
									{customerTransportList.ticketPrice}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default TransportListForCustomers;
