const User = require('../models/Users');
const { StatusCodes } = require('http-status-codes');

const registerUser = async (req, res) => {
    const user = await User.create({ 
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    })

    res.status(StatusCodes.OK).json({ user });
}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    res.status(StatusCodes.OK).json({ user })
}

const getUsers = async (req, res) => {
    const user = await User.find({  }).sort('name');

    res.status(StatusCodes.OK).json({ count: user.length, user });
}

const logout = async (req, res) => {
    res.send('Logout');
}

module.exports = { registerUser, getUsers, login, logout };