import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: 'none', // Adjust as needed
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    })
}