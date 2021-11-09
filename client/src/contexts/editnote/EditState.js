import React, { useState, useRef } from "react";
import EditContext from "./editContext";

function Editstate(props) {
	const [note, setNote] = useState({eid: "", etitle: "", edescription: "", etag: "" });
	const ref = useRef(null);

	const clickonEdit = (currNote) => {
		ref.current.click();
    setNote({
      eid: currNote._id,
			etitle: currNote.title,
			edescription: currNote.description,
			etag: currNote.tag,
		});
	};

	return (
		<EditContext.Provider value={{ ...note, ref, setNote, clickonEdit }}>
			{props.children}
		</EditContext.Provider>
	);
}

export default Editstate;
