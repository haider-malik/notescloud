const mongoose = require("mongoose");
const { Schema } = mongoose;

// A schema, basically a format in which data will be stored in the database when entered by the user
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date, //Date - JavaScript Object
		default: Date.now,
	},
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
