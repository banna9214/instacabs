module.exports = {
    login: function (req, res) {
        return res.view('user/login', {title: 'Login'});
    },
    asignup: function (req, res, next) {
        if (req.method.toUpperCase() == 'POST') {
            req.session.flash = '';
            User.create(req.params.all()).done(function (err, user) {
                if (err) {
                    return next(err);
                }
                else {
                    res.json(user);
                }
            });
        } else {

        }
        return res.view('user/asignup', {title: 'Sign UP'});
    },
    create: function (req, res) {
        var params = {email: req.params.all().email};
        User.findOne(params).exec(function (err, user) {
            if (err) {
                return res.send(error, 500);
            }

            if (user) {
                req.session.flash = {
                    error: 'Error: User with that email already exists'
                }
                return res.redirect('/asignup');
                req.session.flash = '';
            } else {
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
            }
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
    },
    edit_customer: function (req, res) {
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
        if (req.method.toUpperCase() == 'GET') {
            var params = req.params.all();
            if (!params.id || params.id == null) {
                req.session.flash = {
                    error: 'Invalid Request'
                }
                return res.redirect('/admin/customers');
            }
            return res.view('user/edit_customer', {total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open, customerid: params.id});
        }
    },
    edit_driver: function (req, res) {
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
        if (req.method.toUpperCase() == 'GET') {
            var params = req.params.all();
            if (!params.id || params.id == null) {
                req.session.flash = {
                    error: 'Invalid Request'
                }
                return res.redirect('/admin/customers');
            }
            // find data by id
            User.findOne({id: params.id}).exec(function (err, user) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                var new_user_obj = {};

                if (!user.id || user.id == "")
                    new_user_obj.id = "";
                else
                    new_user_obj.id = user.id;

                if (!user.first_name || user.first_name == "")
                    new_user_obj.first_name = "";
                else
                    new_user_obj.first_name = user.first_name;

                if (!user.last_name || user.last_name == "")
                    new_user_obj.last_name = "";
                else
                    new_user_obj.last_name = user.last_name;

                if (!user.gender || user.gender == "")
                    new_user_obj.gender = "";
                else
                    new_user_obj.gender = user.gender;

                if (!user.contact_no || user.contact_no == "")
                    new_user_obj.contact_no = "";
                else
                    new_user_obj.contact_no = user.contact_no;

                if (!user.profile_pic || user.profile_pic == "")
                    new_user_obj.profile_pic = "";
                else
                    new_user_obj.profile_pic = user.profile_pic;

                if (!user.language || user.language == "")
                    new_user_obj.language = "";
                else
                    new_user_obj.language = user.language;

                new_user_obj.email = user.email;
                new_user_obj.createdAt = user.createdAt;
                new_user_obj.updatedAt = user.updatedAt;

                return res.view('user/edit_driver', {total_drivers_reg: total_drivers_reg, total_customers_reg: total_customers_reg, loggedin_user: loggedin_user, tab_open: tab_open, user_data: new_user_obj});
            });
        } else {
            var params = req.params.all();
            console.log(params);
            
        }
    },
    delete_customer: function (req, res) {

        if (req.method.toUpperCase() == 'GET') {
            var params = req.params.all();
            if (!params.id || params.id == null) {
                req.session.flash = {
                    error: 'Invalid Request'
                }
                return res.redirect('/admin/customers');
            } else {
                var json = {};
                var paramas = {id: params.id};
                User.destroy({id: params.id}).exec(function (err, users) {
                    if (err) {
                        json.succ = 0;
                        json.msg = 'Something went wrong. Please try again later';
                    } else {
                        json.succ = 1;
                        json.msg = 'Customer deleted successfully';
                    }
                    req.session.flash = {
                        success: 'Customer deleted successfully'
                    }
                    return res.send(json);
                });
            }

        }
    },
    delete_driver: function (req, res) {

        if (req.method.toUpperCase() == 'GET') {
            var params = req.params.all();
            if (!params.id || params.id == null) {
                req.session.flash = {
                    error: 'Invalid Request'
                }
                return res.redirect('/admin/drivers');
            } else {
                var json = {};
                var paramas = {id: params.id};
                User.destroy({id: params.id}).exec(function (err, users) {
                    if (err) {
                        json.succ = 0;
                        json.msg = 'Something went wrong. Please try again later';
                    } else {
                        json.succ = 1;
                        json.msg = 'Driver deleted successfully';
                    }
                    req.session.flash = {
                        success: 'Driver deleted successfully'
                    }
                    return res.send(json);
                });
            }

        }
    },
    delete_company: function (req, res) {
        if (req.method.toUpperCase() == 'GET') {
            var params = req.params.all();
            if (!params.id || params.id == null) {
                req.session.flash = {
                    error: 'Invalid Request'
                }
                return res.redirect('/admin/companies');
            } else {
                var json = {};
                var paramas = {id: params.id};
                User.destroy({id: params.id}).exec(function (err, users) {
                    if (err) {
                        json.succ = 0;
                        json.msg = 'Something went wrong. Please try again later';
                    } else {
                        json.succ = 1;
                        json.msg = 'Company deleted successfully';
                    }
                    req.session.flash = {
                        success: 'Company deleted successfully'
                    }
                    return res.send(json);
                });
            }

        }
    }
};