exports.IsAuthenticated = async (req, res, next) => {
	req.user ? next() : res.status(401).send("Un Authoraized Request");
};
