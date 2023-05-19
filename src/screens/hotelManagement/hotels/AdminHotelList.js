import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHotelAdmin, deleteHotelAction } from "../../../actions/hotelManagementActions/hotelAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import MainScreen from "../../../components/MainScreen";
import "./hotel-view.css";

export default function AdminHotelList() {
	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const hotelListAdmin = useSelector((state) => state.hotelListAdmin);
	const { loading, adminHotels, error } = hotelListAdmin;

	const hotelDelete = useSelector((state) => state.hotelDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = hotelDelete;

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
					dispatch(deleteHotelAction(id));
					swal({
						title: "Success!",
						text: "Deleted Hotel Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Hotel",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listHotelAdmin());
	}, [dispatch, history, successDelete]);
	if (adminInfo) {
		return (
			<div className="adminHoteList" style={{ minHeight: 900 }}>
				<br></br>
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
									marginLeft: "80px",
									color: "white",
								}}
							>
								View Hotel
							</h1>
							<Link to="/admin-hotel-create">
								<Button style={{ marginLeft: "720px", width: "50px", height: "50px", fontSize: "20px" }}>+</Button>
							</Link>
						</span>
					</div>

					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{adminHotels?.map((hotel) => (
						<div className="product-card" style={{ border: "2px solid black", borderRadius: "15px" }}>
							<div className="details">
								<div className="big-img">
									<img
										src={hotel.pic}
										alt=""
										style={{
											width: "320px",
											height: "220px",
											borderRadius: "15px",
											margin: "5px",
										}}
									></img>
								</div>
								<div className="box">
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2>{hotel.hotelName}</h2>
										</span>
									</div>
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2 style={{ color: "black" }}>{hotel.location}</h2>
										</span>
									</div>
									<div className="row" style={{ marginLeft: "50px" }}>
										<span>
											<h2 style={{ color: "black" }}>{hotel.address}</h2>
										</span>
									</div>

									<Link to={`/hotel-update/${hotel._id}`}>
										<Button style={{ marginLeft: "50px", borderRadius: "15px" }} className="cart">
											View
										</Button>
									</Link>

									<Button
										onClick={() => deleteHandler(hotel._id)}
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
