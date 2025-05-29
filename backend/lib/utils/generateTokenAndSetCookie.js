import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' });
  
    res.cookie('token', token, {
        httpOnly: true,
        path:'/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3 * 24 * 60 * 60 * 1000, 
        same_site: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
}