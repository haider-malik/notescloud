const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");

const secret = "thisisjwtsecret";

let success = false;

//Route 2 - Sign Up post request at http://localhost/api/auth/createuser - Login not required
router.post(
	"/createuser",
	body("email", "Enter a valid Email").isEmail(),
	body(
		"name",
		"Name must be at least 5 characters long and must not be a number" //Message if name is less than 5 characters or a number
	).isLength({
		min: 5,
	}),
	body(
		"password",
		"Password must be at least 8 characters long and must not be a number" // Message if password is less than 8 characters or a number
	).isLength({
		min: 8,
	}),
	async (req, res) => {
		//If there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			success = false;
			return res.status(400).json({ success, errors: errors.array() });
		}

		//Checking whether a user with the samee email already exists
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				success = false;
				return res
					.status(400)
					.json({ success, error: "User with this email already exists" });
			}

			// We can also use await instead of using Sync in below two statements
			const salt = bcrypt.genSaltSync(10);
			const secPass = bcrypt.hashSync(req.body.password, salt);
			//Creating a new user in the database
			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});
			// .then((user) => res.json(user))    // returning the same data to the user
			// .catch((err) => {
			// 	console.log(err);             // If user enters an email again
			// 	res
			// 		.status(404)
			// 		.json({ error: "Email already exists", message: err.message });      //Message that will be provided by the server when multiple fields with same values, that were required to be unique are entered
			// });

			// data that we want to send in authentication token
			const data = {
				user: {
					id: user.id,
				},
			};

			// generating authentication token
			const authToken = jwt.sign(data, secret);

			// console.log(authToken); logging in console

			// res.status(200).json(user);
			// sending auth token instead of user data to himself
			success = true;
			res.status(200).json({ success, authToken });
		} catch (error) {
			console.error(error.message);
			success = false;
			res.status(500).send({ success, error: "Internal Server Error" });
		}
	}
);

//Route 2: Login request handling - Login not required
router.post(
	"/login",
	body("email", "Enter a valid Email").isEmail(),
	body(
		"password",
		"Password can not be blank" //If user enters a blank password
	).exists(),
	async (req, res) => {
		//If there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			success = false;
			return res.status(400).json({ success, errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			// checking whether user exists in the database
			let user = await User.findOne({ email });
			if (!user) {
				success = false;
				return res
					.status(400)
					.json({ success, error: "Please login with correct credentials" });
			}

			//checking whether entered password matches with the password stored in the database
			const passMatch = await bcrypt.compare(password, user.password);
			if (!passMatch) {
				success = false;
				return res
					.status(400)
					.json({ success, error: "Please login with correct credentials" });
			}

			//if user exists and password matches then returning authentication token
			const data = {
				user: {
					id: user.id,
				},
			};

			const authToken = jwt.sign(data, secret);
			success = true;
			res.status(200).json({ success, authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

//Route 3: Get loggedin user details using post request - Login required
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		//getting user id from req header as it has been added to req by fetchuser middleware
		userId = req.user.id;

		// finding user by id
		const user = await User.findById(userId).select("-password").select("-__v");

		//sending user details as response
		res.status(200).json(user);
	} catch (error) {
		// if user is not found or any error occurs then it will throw this error
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
