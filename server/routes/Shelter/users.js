const express = require('express');
const router = express.Router();
const { Shelter, validateShelter } = require('../../models/shelter');
const bcrypt = require('bcrypt');
// const Token = require('../../models/token');
// const sendEmail = require('../../utils/sendEmail');
// const crypto = require('crypto');

router.post('/signup', async (req, res) => {
  try {
    const { error } = validateShelter(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let shelter = await Shelter.findOne({ email: req.body.email });
    if (shelter) {
      return res
        .status(409)
        .send({ message: 'User with given email already exists!' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALTS));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    shelter = await new Shelter({
      ...req.body,
      password: hashPassword,
    }).save();

    // const token = await new Token({
    //   userId: shelter._id,
    //   token: crypto.randomBytes(32).toString('hex'),
    // }).save();

    // const url = `${process.env.BASE_URL}/shelterUser/${shelter._id}/verify/${token.token}`;

    // // Assuming sendEmail function works as expected
    // await sendEmail(shelter.email, 'Verify Email', url);

    // res.status(201).send({
    //   message: 'An email has been sent to your account. Please verify.',
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// router.get('/:id/verify/:token', async (req, res) => {
//   try {
//     const shelter = await Shelter.findOne({ _id: req.params.id });
//     if (!shelter) {
//       return res.status(400).send({ message: 'Invalid link' });
//     }

//     const token = await Token.findOne({
//       userId: shelter._id,
//       token: req.params.token,
//     });

//     if (!token) {
//       return res.status(400).send({ message: 'Invalid link' });
//     }

//     await Shelter.updateOne({ _id: shelter._id }, { verified: true });
//     await token.remove();

//     res.status(200).send({ message: 'Verification successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
