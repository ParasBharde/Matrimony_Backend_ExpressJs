import express from 'express';
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; 
        const token = authHeader.split(' ')[1];
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            req.user = decoded.id;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "You are not logged in" });
    }
};

export default authMiddleware;
