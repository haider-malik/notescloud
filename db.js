// Connecting to mongodb database
const mongoose = require("mongoose");
const mongoURI =
	"mongodb+srv://haider:0Kdoitbetter@cluster0.nevm0.mongodb.net/iNotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log("Connected to mongoDB Successfully");
	});
};

//Exporting the function to create mongodb database
module.exports = connectToMongo;
