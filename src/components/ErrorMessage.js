import React from "react";
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const ErrorMessage = ({ variant = "info", children }) => {
	return (
		<Alert variant={variant} style={{ fontSize: 20 }}>
			<strong>{children}</strong>
		</Alert>
	);
};

export default ErrorMessage;
