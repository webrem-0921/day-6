const express = require("express")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("./../models/User.model")

const router = express.Router()
const saltRounds = 10

const { isAuthenticated } = require('./../middlewares/jwt.middleware')


router.post('/signup', (req, res) => {

    const { username, password } = req.body

    if (username === '' || password === '') {
        res.status(400).json({ message: "Provide username and password" });
        return;
    }


    User
        .findOne({ username })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." });
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({ username, password: hashedPassword });
        })
        .then((createdUser) => {
            const { username, _id } = createdUser;
            const user = { username, _id };
            res.status(201).json({ user: user });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
        })
})


// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
        res.status(400).json({ message: "Provide username and password." });
        return;
    }

    User
        .findOne({ username })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {

                const { _id, username } = foundUser;

                const payload = { _id, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Incorrect password" });
            }

        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    setTimeout(() => res.status(200).json(req.payload), 2000)
})

module.exports = router
