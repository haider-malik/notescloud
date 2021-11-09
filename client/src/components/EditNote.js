import React, { useContext, useRef } from "react";
import editContext from "../contexts/editnote/editContext";
import noteContext from "../contexts/notes/noteContext";
import "./CSS/EditNote.css";

function Editnote() {
	const econtext = useContext(editContext);
	const context = useContext(noteContext);

	const { alterNote } = context;

	const { ref, eid, etitle, edescription, etag, setNote } = econtext;

	const ref2 = useRef(null);

	const updateNote = (e) => {
		e.preventDefault();
		alterNote(eid, etitle, edescription, etag);
		ref2.current.click();
	};

	const onChangeTitle = (e) => {
		setNote({
			// simply changing only one field will not work because setNote is not a part of this component
			eid: eid,
			etitle: e.target.value,
			edescription: edescription,
			etag: etag,
		});
	};

	const onChangeDesc = (e) => {
		setNote({
			eid: eid,
			etitle: etitle,
			edescription: e.target.value,
			etag: etag,
		});
	};

	const onChangeTag = (e) => {
		setNote({
			eid: eid,
			etitle: etitle,
			edescription: edescription,
			etag: e.target.value,
		});
	};

	return (
		<>
			<button
				type="button"
				className="d-none btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={ref}
			></button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div
						className="modal-content"
						style={{
							border: "none",
							borderRadius: "10px",
							backgroundColor: "rgb(246, 246, 246)",
						}}
					>
						<div
							className="modal-header"
							style={{
								border: "none",
							}}
						>
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Note
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								ref={ref2}
								aria-label="Close"
							></button>
						</div>
						<form className="content-body">
							<div className="modal-body">
								<input
									type="text"
									name="etitle"
									className="form-control my-3 inp"
									placeholder="Title"
									id="etitle"
									value={etitle}
									onChange={onChangeTitle}
								/>
								<input
									type="text"
									name="edescription"
									className="form-control my-3 inp"
									placeholder="Description"
									id="edescription"
									value={edescription}
									onChange={onChangeDesc}
								/>
								<input
									type="text"
									name="etag"
									className="form-control my-3 inp"
									placeholder="Tag"
									id="etag"
									value={etag}
									onChange={onChangeTag}
								/>
							</div>
							<div
								className="modal-footer"
								style={{
									border: "none !important",
								}}
							>
								<button
									disabled={etitle.length < 5 || edescription.length < 8}
									onClick={updateNote}
									type="submit"
									className="btn btn-primary"
								>
									Update Note
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Editnote;
