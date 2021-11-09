const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ResultWithContext } = require("express-validator/src/chain");
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");

//get request to fetch notes of a particular user - Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
	try {
		// fetching all notes by user id
		const Note = await Notes.find({ user: req.user.id });

		//sending notes as response
		res.status(200).json(Note);
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
});

// endpoint to add notes
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Title must be at least 3 characters long").isLength({
			min: 3,
		}),
		body(
			"description",
			"Description must be at least 8 characters long"
		).isLength({ min: 8 }),
	],
	async (req, res) => {
		const { title, description, tag } = req.body;
		//If there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);
		let hour, min, sec;

		hour = today.getHours().toString();
		min = today.getMinutes().toString();
		sec = today.getSeconds().toString();

		try {
			// creating a new note according to user's provided info
			const Note = await new Notes({
				title,
				description,
				tag,
				date:
					today.toDateString() +
					" " +
					(hour.length === 1 ? "0" + hour : hour) +
					":" +
					(min.length === 1 ? "0" + min : min) +
					":" +
					(sec.length === 1 ? "0" + sec : sec),
				user: req.user.id,
			});
			const savedNote = await Note.save(); //note saved

			// sending the saved note as response
			res.json(savedNote);
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}
);

//Update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	// Destructuring the contents of the note from the request body
	const { title, description, tag } = req.body;

	try {
		// Creating a new note with the contents given in the request body
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}

		// Finding the note (by id given in the url) which has to be updated
		let note = await Notes.findById(req.params.id);
		if (!note) {
			// If note not found
			return res.status(404).send("Note not found");
		}

		// Checking whether the note belongs to the same user who is filing an update request
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Access Denied");
		}

		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);

		let hour, min, sec;

		hour = today.getHours().toString();
		min = today.getMinutes().toString();
		sec = today.getSeconds().toString();

		newNote.date =
			today.toDateString() +
			" " +
			(hour.length === 1 ? "0" + hour : hour) +
			":" +
			(min.length === 1 ? "0" + min : min) +
			":" +
			(sec.length === 1 ? "0" + sec : sec);

		// Finally updating the note
		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);

		// Sending new note as response
		res.status(200).json({ note });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		// finding the note in the database from the id that i got from the url
		let note = await Notes.findById(req.params.id);
		if (!note) {
			//if Note not found
			return res.status(404).send("Note not found");
		}

		if (note.user.toString() !== req.user.id) {
			// If note does not belong to the user who is trying to delte it
			return res.status(401).send("Access Denied");
		}

		// Finally finding and deleting the note
		await Notes.findByIdAndDelete(req.params.id);

		res.status(200).json({ success: "Note Deleted Successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
});
module.exports = router;
