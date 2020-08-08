const router = require('express').Router();
const passport = require('passport')

// auth login
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
          success: true,
          message: "user has successfully authenticated",
          user: req.user,
          cookies: req.cookies
        });
      }
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    console.log("LOGout")
    req.logout()
    res.redirect('http://localhost:3001/signin');
});

router.get('/google/', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log("Redirect")
    res.redirect('http://localhost:3001/profile')
});

module.exports = router;