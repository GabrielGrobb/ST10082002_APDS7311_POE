const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { isValidPassword } = require('../utils/hash');
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store);


//Login route
router.post('/',bruteForce.prevent, async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
        return res.status(401).json({ error: 'Incorrect username or password'});

    const valid = await isValidPassword(req.body.password, user.password);

    if(!valid)
        return res.status(401).json({ error: 'Incorrect username or password'});

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY);
    res.send({ token });
});

module.exports = router;