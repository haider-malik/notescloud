import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";

function Addnote() {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "" });

	const handleOnclick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
	};

	const onChange = (e) => {
		// setting note state on change
		// this type of notation will preserve the other fields in note while changing a particular field
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<form
				style={{
					margin: "auto",
					width: "80%",
					maxWidth: "870px",
				}}
			>
				<div className="mb-3">
					<input
						type="text"
						name="title"
						value={note.title}
						className="form-control inpl"
						placeholder="Title"
						id="title"
						onChange={onChange}
					/>
				</div>
				<div className="mb-3 text-center">
					<textarea
						className="form-control inpl"
						value={note.description}
						name="description"
						id="description"
						placeholder="Description"
						rows="3"
						onChange={onChange}
					></textarea>
					<input
						type="text"
						value={note.tag}
						name="tag"
						className="form-control my-3 inpl"
						placeholder="Tag"
						id="tag"
						onChange={onChange}
					/>
					<button
						disabled={note.title.length < 5 || note.description.length < 8}
						type="submit"
						className="btn btn-primary my-3"
						onClick={handleOnclick}
					>
						Add Note
					</button>
				</div>
			</form>
		</>
	);
}

export default Addnote;
