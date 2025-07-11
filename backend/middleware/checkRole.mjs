export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).json({ msg : 'Unauthorized. Please log in.' });
    }
    next();
};

export const isCustomer = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'Customer') {
        res.status(403).json({ msg : 'Unauthorized. Please log in.' });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        res.status(403).json({ msg : 'Forbidden. Admin access only.' });
    }
    next();
};
