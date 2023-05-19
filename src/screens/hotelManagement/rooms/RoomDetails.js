import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import { listRoomAdmin, deleteRoomAction } from "../../../actions/roomManagementActions/roomAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import "./hotelManagement.css";

export default function RoomDetails({ match, history }) {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const roomListAdmin = useSelector((state) => state.roomListAdmin);
	const { adminRooms } = roomListAdmin;

	const roomDelete = useSelector((state) => state.roomDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = roomDelete;

	useEffect(() => {
		dispatch(listRoomAdmin(match.params.id));
	}, [match.params.id, dispatch, successDelete]);

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteRoomAction(id));
					swal({
						title: "Success!",
						text: "Deleted Room Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Room",
					type: "error",
				});
			});
	};

	if (adminInfo) {
		return (
			<div className="roomDetails">
				<br></br>
				<MainScreen title="">
					<br></br>
					<br></br>
					<div className="row">
						<span style={{ display: "flex" }}>
							<h1
								style={{
									fontSize: "45px",
									fontWeight: "bold",
									marginLeft: "120px",
									color: "white",
								}}
							>
								View Room
							</h1>
							<Link to={`/room-create/${match.params.id}`}>
								<Button style={{ marginLeft: "620px", width: "50px", height: "50px", fontSize: "20px" }}>+</Button>
							</Link>
						</span>
					</div>
					<br></br>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{adminRooms?.map((room) => (
						<div
							className="product-card-update"
							style={{ marginBottom: "50px", border: "2px solid black", marginLeft: "110px", borderRadius: "20px" }}
						>
							<div className="details">
								<div className="big-img">
									<img
										src={room.pic}
										alt=""
										style={{
											width: "320px",
											height: "220px",
											margin: "5px",
											borderRadius: "15px",
										}}
									></img>
								</div>
								<div className="box">
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2>{room.roomType}</h2>
										</span>
									</div>
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2 style={{ color: "black" }}>Price : {room.price} per day</h2>
										</span>
									</div>
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2 style={{ color: "black" }}>Room Size : {room.roomSize}</h2>
										</span>
									</div>

									<Link to={`/room-update/${room._id}`}>
										<Button style={{ marginLeft: "50px", borderRadius: "15px" }} className="cart">
											View
										</Button>
									</Link>
									<Button
										onClick={() => deleteHandler(room._id)}
										style={{ marginLeft: "20px", borderRadius: "15px", backgroundColor: "red" }}
										className="cart"
									>
										Delete
									</Button>
								</div>
							</div>
						</div>
					))}
					<br></br>
					<br></br>
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
}
