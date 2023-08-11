const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const shelterSchema = new mongoose.Schema({
  shelterName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

shelterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
shelterSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEYS, {
		expiresIn: "7d",
	});
	return token;
};
const Shelter = mongoose.model("Shelter", shelterSchema);

const validateShelter = (data) => {
  const schema = Joi.object({
    shelterName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { Shelter, validateShelter };
