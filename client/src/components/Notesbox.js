import React, { useContext, useEffect } from "react";
import noteContext from "../contexts/notes/noteContext";
import EditNote from "./EditNote";
import Noteitem from "./Noteitem";
import "../App.css";
import { useHistory } from "react-router";
import notepen from "./images/notepen.svg";
import GetNotesLoader from "./GetNotesLoader";
import Noresult from "./Noresult";

function Notesbox() {
	const context = useContext(noteContext);
	const { notes, getNotes, loading, search } = context;
	let history = useHistory();
	let flag = false;

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getNotes();
		} else {
			history.push("/login");
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div
				style={{
					width: "75%",
					margin: "auto",
				}}
			>
				<EditNote />
				{!loading && notes.length === 0 && (
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
							src={notepen}
							alt=""
						/>
						<p className="addsomenotes">ADD SOME NOTES</p>
					</div>
				)}
				{loading && <GetNotesLoader />}
				<div className="row text-center justify-content-center my-3">
					{/* displaying every note using map function  */}
					{notes.map((note) => {
						if (search != null) {
							if (
								note.title.includes(search) ||
								note.description.includes(search) ||
								note.tag.includes(search) ||
								note.date.includes(search)
							) {
								flag = true;
								return <Noteitem key={note._id} note={note} />;
							}
						} else {
							flag = true;
							return <Noteitem key={note._id} note={note} />;
						}
					})}
					{!loading && !flag && <Noresult />}
				</div>
			</div>
		</>
	);
}

export default Notesbox;
