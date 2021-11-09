import React, { useState } from "react";
import { useHistory } from "react-router";
import LoginLoader from "./LoginLoader";
import Alert from "./Alert";

function Signup(props) {
	document.title = "NotesCloud | Sign Up";
	let history = useHistory();

  const { setTok } = props;
  
  const [alert, setAlert] = useState({ icon: null, message: "" });

	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});

	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { name, email, password } = credentials;
		const response = await fetch("/api/auth/createuser", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});
		const json = await response.json();
		if (json.success) {
			localStorage.setItem("token", json.authToken);
			setTok(true);
			history.push("/");
		} else {
			setAlert({
				icon: <i className="fas fa-exclamation-triangle"></i>,
				message: "Enter valid credentials",
			});
		}
		setLoading(false);
	};

  const onChange = async (e) => {
    setAlert({ icon: null, message: "" });
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Alert alert={alert} setAlert={setAlert} />
			{loading && <LoginLoader />}
			{!loading && (
				<div
					className="container d-flex"
					style={{
						marginTop: "0 !important",
						height: "80vh",
						position: "relative",
						top: "50px",
					}}
				>
					<form
						onSubmit={onSubmit}
						style={{
							margin: "auto",
						}}
					>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Name
							</label>
							<input
								value={credentials.name}
								type="text"
								name="name"
								className="form-control inpl"
								id="name"
								required
								minLength="5"
								aria-describedby="emailHelp"
								onChange={onChange}
							/>
							<label htmlFor="email" className="form-label mt-3">
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
							Sign Up
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default Signup;
