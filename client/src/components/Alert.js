import React from "react";
import $ from "jquery";

function Alert(props) {
	const { alert } = props;

	if (alert.icon && alert.message) {
		$(".toast").show(500);
		setTimeout(() => {
			$(".toast").fadeOut("fast");
		}, 1400);
	}

	return (
		<div
			className="toast"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			style={{
				position: "absolute",
				textAlign: "center",
				background: "rgba(216, 216, 216, 0.386)",
				backdropFilter: "blur(5px)",
				width: "270px",
				right: "4px",
				top: "70px",
			}}
		>
			<div
				className="toast-body"
				style={{
					paddingRight: "0px",
					paddingLeft: "0px",
					paddingTop: "10px",
					paddingBottom: "10px",
				}}
			>
				<strong>
					{alert.icon} {alert.message}
				</strong>
			</div>
		</div>
	);
}

export default Alert;
