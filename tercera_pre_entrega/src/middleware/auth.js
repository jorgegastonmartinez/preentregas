export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect("/products")
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.redirect("/login");
    }
};

export const isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'user' || "User") {
        return next();
    } else {
        res.redirect("/login");
    }
};