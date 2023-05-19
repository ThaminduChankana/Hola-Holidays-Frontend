import React from "react";
import AddTransport from "../screens/transportManagement/adminTransportManagement/createTransport/addTransport";
import TransportListForAdmin from "../screens/transportManagement/adminTransportManagement/getAllTransport/getAllTransport";
import EditTransport from "../screens/transportManagement/adminTransportManagement/updateTransport/updateTransport";
import TransportListForCustomers from "../screens/transportManagement/customerTransportManagement/transportListForCustomer/transportListForCustomer";
import { render } from "react-dom";

import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

  jest.mock('../components/MainScreen.css', () => {});
  jest.mock('../screens/transportManagement/adminTransportManagement/createTransport/addTransport.css', () => {});
  jest.mock('../screens/transportManagement/adminTransportManagement/getAllTransport/transportList.css', () => {});
  jest.mock('../screens/transportManagement/adminTransportManagement/updateTransport/updateTransport.css', () => {});
  jest.mock('../screens/transportManagement/customerTransportManagement/transportListForCustomer/BusDetails.css', () => {});

  it("render without crashing", () => {
    const div = document.createElement("div");
    render(<AddTransport></AddTransport>, div);
  });
  
  it("render without crashing", () => {
    const div = document.createElement("div");
    render(<TransportListForAdmin></TransportListForAdmin>, div);
  });
  
  it("render without crashing", () => {
    const div = document.createElement("div");
    render(<EditTransport></EditTransport>, div);
  });
  
  it("render without crashing", () => {
    const div = document.createElement("div");
    render(
        <TransportListForCustomers></TransportListForCustomers>,
      div
    );
  });