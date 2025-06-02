// middlewares/roleMiddleware.js
const Roles = {
  USER: 1,
  ADMIN: 2,
};

function authorize(requiredLevel) {
    return (req, res, next) => {
      if (!req.user || req.user.userLevel < requiredLevel) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    };
  }

module.exports = {
  authorize,
  Roles
}; 