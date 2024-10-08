require('dotenv').config();
const User = require('../models/Users');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../error')

const registerUser = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ 
        user: user.name, 
        token 
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email) {
        throw new BadRequestError('Please Provide Email!');
    }
    if(!password) {
        throw new BadRequestError('Please Provide Password');
    }

    const user = await User.findOne({ email: email });
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = await user.createJWT();

    return res.status(StatusCodes.OK).json({ user: user.name, token })
}

const dashboard = async (req, res) => {
    // console.log(req.user);
    res.status(200).json( req.user );
}

// const getUsers = async (req, res) => {
//     const user = await User.find({  });

//     res.status(StatusCodes.OK).json({ count: user.length, user });
// }

const logout = async (req, res) => {
    res.send('Logout');
}

module.exports = { registerUser, login, dashboard, logout };