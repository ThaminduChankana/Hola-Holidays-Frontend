import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
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

function App() {
	return (
		<BrowserRouter>
			<main>
				<Route path="/access-denied" component={AccessDenied} />
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

				<Route path="/customer-sites" component={SitesListForCustomerScreen} exact />
				<Route path="/customer-site/:id" component={SingleSiteForCustomerScreen} exact />
			</main>
		</BrowserRouter>
	);
}

export default App;
