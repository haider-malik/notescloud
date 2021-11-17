import React from "react";
import noresult from "./images/no-results.svg";

const Noresult = () => {
	return (
		<div
			className="d-flex"
			style={{
				justifyContent: "center",
				width: "100%",
				fontSize: "5vw",
				flexDirection: "column",
				textAlign: "center",
			}}
		>
			<img
				style={{
					height: "100px",
					width: "100px",
					margin: "auto",
				}}
				src={noresult}
				alt=""
			/>
			<p className="addsomenotes">NO NOTE FOUND</p>
		</div>
	);
};

export default Noresult;
