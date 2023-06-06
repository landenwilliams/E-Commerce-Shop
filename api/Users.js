const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {getUser, getUserByUsername, createUser} = require('../DB/Users');

dotenv.config();

// POST /api/Users/register
router.post('/register', async(req, res, next) => {
    const {username, password, isAdmin} = req.body.user;
    try {
        const existingUsername = await getUserByUsername(username);
        if(existingUsername){
            res.send({
                error: "BROKEN",
                name: "UserAlreadyExists",
                message: `User ${username} is already taken.`
            });
        }else{
            const newUser = await createUser({username, password, isAdmin});
            console.log("good register", newUser);
            const jsonToken = jwt.sign(newUser, process.env.JWT_SECRET);
            res.send({
                message: "Thanks for joining us!",
                token: jsonToken,
                user: newUser
            });
        }
    }catch(err){
        next(err);
    }
});

// GET /api/Users/login
router.post('/login', async (req, res, next) => {
    const{ username, password } = req.body;
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }
    try{
        const user = await getUser(username, password);
        const token = jwt.sign(user, process.env.JWT_SECRET);

        if(user){
            console.log("good login");
            res.send({
                user: user,
                message: "you're logged in!",
                token: token
            });
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;