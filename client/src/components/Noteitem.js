import React, { useContext } from "react";
import noteContext from "../contexts/notes/noteContext";
import editContext from "../contexts/editnote/editContext";

//A single noteitem component
function Noteitem(props) {
	const context = useContext(noteContext);
	const econtext = useContext(editContext);
	const { clickonEdit } = econtext;
	const { deleteNote } = context;
	const { note } = props;
	return (
		<div
			className="col mb-2"
			style={{
				minWidth: "250px",
			}}
		>
			<div className="card mb-2 card-b">
				<div className="card-body ">
					<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
						{note.tag}
						<span className="visually-hidden">unread messages</span>
					</span>
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
					<p className="card-text">
						<small className="text-muted">Last updated on {note.date}</small>
					</p>
					<i
						className="fas fa-trash mx-1"
						onClick={() => {
							deleteNote(note._id);
						}}
					></i>
					<i
						className="fas fa-pen-square mx-1"
						onClick={() => {
							clickonEdit(note);
						}}
					></i>
				</div>
			</div>
		</div>
	);
}

export default Noteitem;
