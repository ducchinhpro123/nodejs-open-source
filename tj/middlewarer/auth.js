import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    if (!req.cookies) {
        return res.render('login', {message: 'You have to login first'});
    }

    const token = req.cookies.jwt;

    if (!token) {
        return res.render('login', {message: ''});
    }

    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        req.user = decoded;
        return next();
    } catch (error) {
        console.log(error);
        res.clearCookie('jwt');
        return res.render('login', {message: ''});
    }
}


