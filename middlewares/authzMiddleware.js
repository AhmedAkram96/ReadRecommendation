// middlewares/roleMiddleware.js
const Roles = {
  user: 1,
  admin: 2,
};

function authorize(requiredLevel) {
  return (req, res, next) => {
    // Ensure user exists and has a userLevel
    if (!req.user || !req.user.userLevel) {
      return res.status(403).json({ error: 'Forbidden - No user level found' });
    }

    // Convert string userLevel to numeric value
    const userLevel = Roles[req.user.userLevel];

    // Check if user's level is sufficient
    if (!userLevel || userLevel < requiredLevel) {
      return res.status(403).json({ 
        error: 'Forbidden - Insufficient permissions',
        details: {
          userLevel: req.user.userLevel,
          numericLevel: userLevel,
          requiredLevel
        }
      });
    }
    
    console.log('5. Authorization successful');
    next();
  };
}

module.exports = {
  authorize,
  Roles
}; 