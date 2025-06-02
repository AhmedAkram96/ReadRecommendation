// middlewares/roleMiddleware.js
const Roles = {
  user: 1,
  admin: 2,
};

function authorize(requiredLevel) {
    return (req, res, next) => {
      const userLevel = Roles[req.user.userLevel];
      if (!req.user || userLevel < requiredLevel) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    };
  }

module.exports = {
  authorize,
  Roles
}; 