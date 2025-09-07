import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development', // Set to true in production
        sameSite: 'strict', // Adjust as needed
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    })
}