import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {env} from "../config/env.js"

const protect = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: "Not authorization"});
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        req.user = user;
        next();
    }catch (error) {
        res.status(401).json({ message: 'Not authorized', error: error.message });
    }
};

export default protect;