const User = require('../models/Users');
const { UnauthenticatedError } = require('../error');
const jwt = require('jsonwebtoken');

const auth = async ( req, res, next ) => {
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = {
            userId: payload.userId,
            name: payload.name
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Unauthorized');
   
    }
}

module.exports = auth;