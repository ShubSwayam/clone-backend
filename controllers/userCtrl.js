require('dotenv').config();
const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const users = {
    register: async (req, res) => {
        var { firstName, lastName, email, password, mobile } = req.body;
        if (email) {
            const findEmail = await Users.find({ email });
            if (findEmail.length == 1) {
                return res.status(400).json({ success: false, msg: "User Allready Registered.." });
            } else {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                const userAdd = new Users({ firstName, lastName, email, password, mobile });
                userAdd.save();
                return res.status(200).json({ success: true, msg: "User Register..", userAdd })
            }
        }
    },
    login: async (req, res) => {
        var { email, password } = req.body;
        const loginData = await Users.find({ email });
        if (loginData.length == 0) {
            return res.status(400).json({ success: false, msg: "User Not Found" });
        } else {
            password = loginData[0].password
            bcrypt.compare(req.body.password, password, (err, isMatch) => {
                if (isMatch === true) {
                    const secret = process.env.SECRET
                    var token = jwt.sign({ _id: loginData._id }, secret, { expiresIn: '9h' });
                    return res.status(200).json({ success: true, user: loginData, token });
                } else {
                    return res.status(400).json({ success: false, msg: "Password Not Correct" });
                }
            })

        }
    }
}

module.exports = users