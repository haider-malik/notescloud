const jwt = require("jsonwebtoken");
const secret = "thisisjwtsecret";

const fetchuser = (req, res, next) => {
	// fetching token from the header of the request object
	const token = req.header("auth-token");

	//if token doesn't exist then return error (access denied)
	if (!token) {
		res.status(401).json({ error: "Please authenticate using a valid token" });
	}

	try {
		const data = jwt.verify(token, secret);
		req.user = data.user;
		next();
	} catch (error) {
		//if token is invalid it will send error
		res.status(401).json({ error: "Please authenticate using a valid token" });
	}
};

module.exports = fetchuser;
