import React from "react";
import "./CSS/LoginLoader.css";

const LoginLoader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				height: "90vh",
				alignItems: "center",
				margin: "auto",
			}}
		>
			<div className="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoginLoader;
