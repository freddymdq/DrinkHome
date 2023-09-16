
export const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
};
  
export const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
};

export const adminAccess = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.redirect('/login');
    }
    next();
};
  
export const premiumAccess = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'premium') {
      return res.redirect('/login');
    }
    next();
};