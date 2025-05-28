import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.json({ token });

    const isProductiion = process.NODE_ENV === 'production';
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 3 * 24 * 60 * 60 * 1000, 
        sameSite: isProduction ? 'none' : 'lax',
        });
}