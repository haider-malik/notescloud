import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState(null);
	//fetching all notes from the database
  
	const getNotes = async () => {
		const response = await fetch(`/api/notes/fetchnotes`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();
		// console.log(json);
		setNotes(json);
		setLoading(false);
	};

	// Adding a note
	const addNote = async (title, description, tag) => {
		const data = {
			title: title,
			description: description,
			tag: tag,
		};
		const response = await fetch(`/api/notes/addnote`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(data),
		});
		const note = await response.json();
		setNotes(notes.concat(note));
	};

	//Deleting a note
	const deleteNote = async (id) => {
		// Deleting from frontend
		const newNotes = notes.filter((note) => {
			return id !== note._id;
		});
		setNotes(newNotes);

		// API CALL
		await fetch(`/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		// console.log(await response.json());
	};

	//editing an existing note
	const alterNote = async (id, title, description, tag) => {
		const newNotes = JSON.parse(JSON.stringify(notes));
		//Updating note in frontend

		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);

		let hour, min, sec;

		hour = today.getHours().toString();
		min = today.getMinutes().toString();
		sec = today.getSeconds().toString();

		for (let i = 0; i < newNotes.length; i++) {
			if (newNotes[i]._id === id) {
				newNotes[i].title = title;
				newNotes[i].description = description;
				newNotes[i].tag = tag;
				newNotes[i].date =
					today.toDateString() +
					" " +
					(hour.length === 1 ? "0" + hour : hour) +
					":" +
					(min.length === 1 ? "0" + min : min) +
					":" +
					(sec.length === 1 ? "0" + sec : sec);
				break;
			}
		}
		setNotes(newNotes);

		// updating note in database
		await fetch(`/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});
	};

	return (
		<NoteContext.Provider
			value={{
				notes,
				addNote,
				deleteNote,
				getNotes,
				alterNote,
				loading,
				search,
				setSearch,
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
