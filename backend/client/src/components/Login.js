import React, { useState } from "react";
import { useHistory } from "react-router";
import Alert from "./Alert";
import "./CSS/Login.css";
import LoginLoader from "./LoginLoader";

function Login(props) {
	document.title = "NotesCloud | Login";
	const { setTok } = props;
	let history = useHistory();
	const [credentials, setCredentials] = useState({ email: "", password: "" });

	const [alert, setAlert] = useState({ icon: null, message: "" });
	const [loading, setLoading] = useState(false);

	let json;

	const onSubmit = async (e) => {
		setLoading(true);
		const data = JSON.stringify({
			email: credentials.email,
			password: credentials.password,
		});
		e.preventDefault();
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: data,
		});
		json = await response.json();
		console.log(json);
		if (json.success) {
			setTok(true);
			localStorage.setItem("token", json.authToken);
			history.push("/");
		} else {
			setLoading(false);
			setAlert({
				icon: <i className="fas fa-exclamation-triangle"></i>,
				message: "Invalid Email or Password",
			});
		}
		setLoading(false);
	};

	const onChange = async (e) => {
		setAlert({ icon: null, message: "" });
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		// console.log(credentials);
	};
	return (
		<>
			<Alert alert={alert} setAlert={setAlert} />
			{loading && <LoginLoader />}
			{!loading && (
				<div
					className="d-flex container log"
					style={{
						height: "90vh",
						alignItems: "center",
						maxWidth: "1000px",
						justifyContent: "center",
						padding: "0",
						marginTop: "0",
					}}
				>
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								value={credentials.email}
								type="email"
								name="email"
								className="form-control inpl"
								required
								id="email"
								aria-describedby="emailHelp"
								onChange={onChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">
								Password
							</label>
							<input
								value={credentials.password}
								type="password"
								name="password"
								required
								minLength="8"
								className="form-control inpl"
								id="exampleInputPassword1"
								onChange={onChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary sub">
							Log In
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default Login;
