import React from "react";
import "./CSS/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import noteContext from "../contexts/notes/noteContext";
import { useContext } from "react";

function Navbar(props) {
	let history = useHistory();
	let context = useContext(noteContext);

	let { search, setSearch } = context;
	const { tok, setTok } = props;

	const changeSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleLogout = (e) => {
		localStorage.removeItem("token");
		setTok(false);
		history.push("/login");
	};

	const onSearchSubmit = (e) => {
		e.preventDefault();
	};

	if (localStorage.getItem("token")) setTok(true);
	return (
		<nav className="navbar navbar-expand-md navbar-light ">
			<div className="container-fluid ">
				<Link className="navbar-brand brnd" to="#">
					NotesCloud
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
					style={{
						justifyContent: "flex-end",
					}}
				>
					{tok && (
						<form
							onSubmit={onSearchSubmit}
							className="d-flex my-2 "
							style={{
								maxWidth: "500px",
								margin: "auto",
							}}
						>
							<input
								className="form-control me-2 search-box"
								type="search"
								placeholder="Search Your Notes"
								aria-label="Search"
								value={search}
								onChange={changeSearch}
							/>
							<button
								className="btn btn-outline-primary search-btn"
								type="submit"
							>
								Search
							</button>
						</form>
					)}
					<div
						className="d-flex"
						style={{
							justifyContent: "flex-end",
						}}
					>
						{!tok ? (
							<div>
								<Link className="btn btn-primary" to="/login" role="button">
									Login
								</Link>
								<Link
									className="btn btn-primary mx-2"
									to="/signup"
									role="button"
								>
									Sign Up
								</Link>
							</div>
						) : (
							<button onClick={handleLogout} className="btn btn-primary">
								Logout
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
