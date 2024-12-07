import session from "express-session";

export function checkLogin(req, res, next) {
    if (session.user) {
        next();
    }
    next();
}
