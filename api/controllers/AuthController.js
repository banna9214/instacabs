var passport = require('passport');
module.exports = {
    _config: {
        action: false,
        shortcuts: false,
        rest: false
    },
    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            req.logIn(user, function (err) {
                if (err) {
                    req.session.flash = {
                        error: 'Invalid Username or Password',
                    }
                    return res.redirect('/');
                }
                return res.redirect('/admin/dashboard');
            });
        })(req, res);
    },
    logout: function (req, res) {
        req.logout();
        req.session.flash = {
            success: 'You have loggedout successfully'
        }
        return res.redirect('/');

    }
}