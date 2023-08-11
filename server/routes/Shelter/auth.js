const router = require("express").Router();
const { Shelter } = require("../../models/shelter");
const bcrypt = require("bcrypt");
const Joi = require("joi");
//const Token = require("../../models/token")
// const sendEmail = require("../../utils/sendEmail")
// const crypto = require("crypto")

router.post("/login", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const shelter = await Shelter.findOne({ email: req.body.email });
		if (!shelter) {
			console.log("Sheldot")
			return res.status(401).send({ message: "Invalid Email or Password" });

		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			shelter.password
		);
		if (!validPassword) {
			console.log(req.body.password)
			console.log(shelter.password)
			return res.status(401).send({ message: "Invalid Email or Password" });
		}
		// if (!shelter.verified) {
		// 	let token = await Token.findOne({ userId: shelter._id })
		// 	if (!token) {
		// 		token = await new Token({
		// 			userId: shelter._id,
		// 			token: crypto.randomBytes(32).toString("hex")
		// 		}).save();

		// 		const url = `${process.env.BASE_URL}users/${shelter._id}/verify/${token.token}`

		// 		await sendEmail(shelter.email, "verify Email", url)
		// 	}
		// 	res.status(400).send({ message: "An email send to your account please verify" });
		// }



		const token = shelter.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
