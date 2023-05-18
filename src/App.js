import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Header from "./components/header/Header";
import AccessDenied from "./components/AccessDenied";
import AdminRegisterScreen from "./screens/userManagement/registerUser/AdminRegisterScreen";
import CustomerRegisterScreen from "./screens/userManagement/registerUser/CustomerRegisterScreen";
import AdminLogin from "./screens/userManagement/login/AdminLoginScreen";
import CustomerLogin from "./screens/userManagement/login/CustomerLoginScreen";
import AdminViewScreen from "./screens/userManagement/viewUser/AdminViewScreen";
import CustomerViewScreen from "./screens/userManagement/viewUser/CustomerViewScreen";
import AdminEditScreen from "./screens/userManagement/editUser/AdminEditScreen";
import CustomerEditScreen from "./screens/userManagement/editUser/CustomerEditScreen";
import CustomerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/CustomerListForAdminScreen";
import CustomerEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/CustomerEditByAdminScreen";
import AddSiteByAdminScreen from "./screens/siteManagement/adminSiteManagement/addSiteByAdmin/AddSiteByAdminScreen";
import SitesListForAdminScreen from "./screens/siteManagement/adminSiteManagement/sitesListForAdmin/SitesListForAdminScreen";
import SingleSiteForAdminScreen from "./screens/siteManagement/adminSiteManagement/getSingleSiteForAdmin/SingleSiteForAdminScreen";
import SingleSiteForCustomerScreen from "./screens/siteManagement/customerSiteManagement/getSingleSiteForCustomer/SingleSiteForCustomerScreen";
import SitesListForCustomerScreen from "./screens/siteManagement/customerSiteManagement/sitesListForCustomer/SitesListForCustomerScreen";
import CustomerLandingScreen from "./screens/static/landingPages/CustomerLandingScreen";
import AdminLandingScreen from "./screens/static/landingPages/AdminLandingScreen";
import AddTransport from "./screens/transportManagement/adminTransportManagement/createTransport/addTransport";
import TransportListForAdmin from "./screens/transportManagement/adminTransportManagement/getAllTransport/getAllTransport";
import EditTransport from "./screens/transportManagement/adminTransportManagement/updateTransport/updateTransport";
import Footer from "./components/footer/Footer";
import TourGuideAdd from "./screens/tourguideManagement/TourGuideAdd";
import TourGuideViewList from "./screens/tourguideManagement/TourGuideViewList";
import TourGuideUpdate from "./screens/tourguideManagement/TourGuideUpdate";
import TourGuideCustomerViewList from "./screens/tourguideManagement/TourGuideCustomerList";
import TransportListForCustomers from "./screens/transportManagement/customerTransportManagement/transportListForCustomer/transportListForCustomer";
import AdminHotelList from "./screens/hotelManagement/hotels/AdminHotelList";
import CustomerHotelView from "./screens/hotelManagement/hotels/CustomerHotelView";
import CreateHotel from "./screens/hotelManagement/hotels/CreateHotel";
import UpdateHotel from "./screens/hotelManagement/hotels/UpdateHotel";
import SingleHotelView from "./screens/hotelManagement/hotels/SingleHotelView";
import RoomDetails from "./screens/hotelManagement/rooms/RoomDetails";
import CreateRoom from "./screens/hotelManagement/rooms/CreateRoom";
import UpdateRoom from "./screens/hotelManagement/rooms/UpdateRoom";
import CreateReservation from "./screens/hotelManagement/reservations/CreateReservation";
import ReservationList from "./screens/hotelManagement/reservations/ReservationList";
import HotelReservation from "./screens/hotelManagement/reservations/HotelReservation";
import Map from "./screens/static/map/Map";
import LoginSignUpScreen from "./screens/static/loginSignUp/LoginSignUpScreen";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Route path="/map" component={Map} />
				<Route path="/access-denied" component={AccessDenied} />
				<Route path="/login-signup" component={LoginSignUpScreen} />
				<Route path="/admin-login" component={AdminLogin} />
				<Route path="/customer-login" component={CustomerLogin} />
				<Route path="/customer" component={CustomerLandingScreen} />
				<Route path="/admin" component={AdminLandingScreen} />
				<Route path="/admin-register" component={AdminRegisterScreen} exact />
				<Route path="/customer-register" component={CustomerRegisterScreen} exact />
				<Route path="/admin-view" component={AdminViewScreen} exact />
				<Route path="/customer-view" component={CustomerViewScreen} exact />
				<Route path="/admin-edit" component={AdminEditScreen} exact />
				<Route path="/customer-edit" component={CustomerEditScreen} exact />
				<Route path="/admin-customers" component={CustomerListForAdminScreen} exact />
				<Route path="/admin-customer-edit/:id" component={CustomerEditByAdminScreen} exact />

				<Route path="/admin-site-create" component={AddSiteByAdminScreen} exact />
				<Route path="/admin-sites" component={SitesListForAdminScreen} exact />
				<Route path="/admin-site-edit/:id" component={SingleSiteForAdminScreen} exact />

				<Route path="/" component={SitesListForCustomerScreen} exact />
				<Route path="/customer-site/:id" component={SingleSiteForCustomerScreen} exact />

				<Route path="/tour-guide-add" component={TourGuideAdd} exact />
				<Route path="/tour-guide-list" component={TourGuideViewList} exact />
				<Route path="/tour-guide-customer-list" component={TourGuideCustomerViewList} exact />
				<Route path="/tour-guide-update/:id" component={TourGuideUpdate} exact />

				<Route path="/hotels-admin-view" component={AdminHotelList} exact />
				<Route path="/hotels" component={CustomerHotelView} exact />
				<Route path="/admin-hotel-create" component={CreateHotel} exact />
				<Route path="/hotel-update/:id" component={UpdateHotel} exact />
				<Route path="/hotel-customer-view/:id" component={SingleHotelView} exact />

				<Route path="/room-details/:id" component={RoomDetails} exact />
				<Route path="/room-create/:id" component={CreateRoom} exact />
				<Route path="/room-update/:id" component={UpdateRoom} exact />

				<Route path="/create-reservation/:id" component={CreateReservation} exact />
				<Route path="/reservations" component={ReservationList} exact />
				<Route path="/hotel-reservations/:id" component={HotelReservation} exact />

				<Route path="/admin-transport" component={TransportListForAdmin} exact />
				<Route path="/admin-transport-add" component={AddTransport} exact />
				<Route path="/admin-transport-edit/:id" component={EditTransport} exact />
				<Route path="/customer-transport" component={TransportListForCustomers} exact />
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
