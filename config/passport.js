var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        passwordHash = require('password-hash');

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    User.findOne({email: email}, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (email, password, done) {

    User.findOne({email: email, user_type: 'A'}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'Username not found.'});
        }
        var is_verified = passwordHash.verify(password, user.password);
        if (is_verified == false) {
            return done(null, false, {
                message: 'Invalid Password entered'
            });
        } else {
            var returnUser = {
                email: user.email,
                createdAt: user.createdAt,
                id: user.id
            };
            return done(null, returnUser, {
                message: 'Logged In Successfully'
            });
        }
        /*passwordHash.verify(password, user.password, function (err, res) {
            if (!res)
                return done(null, false, {
                    message: 'Invalid Password entered'
                });
            var returnUser = {
                email: user.email,
                createdAt: user.createdAt,
                id: user.id
            };
            return done(null, returnUser, {
                message: 'Logged In Successfully'
            });
        });*/
    });
}
));