module.exports = {
    login: function (req, res) {
        return res.view('user/login', {title: 'Login'});
    },
    asignup: function (req, res, next) {
        if (req.method.toUpperCase() == 'POST') {
            User.create(req.params.all()).done(function (err, user) {
                if (err) {
                    return next(err);
                }
                else {
                    res.json(user);
                }
            });
        } else {
            req.session.flash = '';
        }
        return res.view('user/asignup', {title: 'Sign UP'});
    },
    create: function (req, res) {
        var params = {email: 'admin'};
        User.findOne(params).exec(function (err, user) {
            if (err) {
                return res.send(error, 500);
            }
            if (user) {
                req.session.flash = {
                    error: 'Error: User with that email already exists'
                }
                return res.redirect('/asignup');
                // req.session.flash = '';
            }
            // var params2 = _.extend(req.query || {}, req.params || {}, req.body || {});
            User.create(req.params.all()).exec(function (err, createdUser) {
                if (err) {
                    req.session.flash = {
                        error: 'Error: user could not be saved into database'
                    }
                } else {
                    req.session.flash = {
                        success: 'User created successfully'
                    }

                }
                return res.redirect('/');
                //  req.session.flash = '';
            });
        });
    },
    dashboard: function (req, res) {
        if (Object.keys(req.session.passport).length == 0) {
            return res.redirect('/');
        }
        var tab_open = 'dashboard';
        var total_drivers_reg = 0;
        var total_customers_reg = 0;
        var loggedin_user = req.session.passport.user;
        User.find({user_type: 'D'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_drivers_reg = total_drivers_reg + user.length;
        });
        User.find({user_type: 'C'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_customers_reg = total_customers_reg + user.length;
        });
        res.view('user/dashboard', {title: 'Dashboard', total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open});
    },
    show: function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(err, 500);
            }
            console.log(users);
            res.view('user/show', {title: 'Show Users', users: users});
        });
    },
    delete: function (req, res) {
        var params = {};
        User.destroy(params, function (err, users) {
            if (err)
                return res.send(err, 500);
            req.session.flash = {
                success: 'User deleted successfully'
            }
            res.redirect('/asignup')
        });
    },
    drivers: function (req, res) {
        if (Object.keys(req.session.passport).length == 0) {
            return res.redirect('/');
        }
        var total_drivers_reg = 0;
        var total_customers_reg = 0;
        var tab_open = 'user';
        var loggedin_user = req.session.passport.user;
        User.find({user_type: 'D'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_drivers_reg = total_drivers_reg + user.length;
        });
        User.find({user_type: 'C'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_customers_reg = total_customers_reg + user.length;
        });
        var params = {user_type: 'D'};
        User.find(params).exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.view('user/drivers_list', {users: user, user_count: user.length, total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open});
        });
    },
    customers: function (req, res) {
        if (Object.keys(req.session.passport).length == 0) {
            return res.redirect('/');
        }
        var total_drivers_reg = 0;
        var total_customers_reg = 0;
        var tab_open = 'user';
        var loggedin_user = req.session.passport.user;
        User.find({user_type: 'D'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_drivers_reg = total_drivers_reg + user.length;
        });
        User.find({user_type: 'C'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_customers_reg = total_customers_reg + user.length;
        });
        var params = {user_type: 'C'};
        User.find(params).exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.view('user/customers_list', {users: user, user_count: user.length, total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open});
        });
    },
    companies: function (req, res) {
        if (Object.keys(req.session.passport).length == 0) {
            return res.redirect('/');
        }
        var total_drivers_reg = 0;
        var total_customers_reg = 0;
        var loggedin_user = req.session.passport.user;
        var tab_open = 'user';
        User.find({user_type: 'D'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_drivers_reg = total_drivers_reg + user.length;
        });
        User.find({user_type: 'C'}).exec(function (err, user) {
            if (err)
                res.send(err);
            total_customers_reg = total_customers_reg + user.length;
        });
        var params = {user_type: 'M'};
        User.find(params).exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.view('user/companies', {users: user, user_count: user.length, total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open});
        });
    }
};