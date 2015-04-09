var bcrypt = require('bcrypt');
module.exports = {
    schema: true, 
    attributes: {
        id: {
            type: 'int'
        },
        name: {
            type: 'string',
            maxLength: 100
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 75
        },
        password: {
            type: 'string',
            required: true
        },
        country: {
            type: 'string'
        },
        state: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        mobile: {
            type: 'string'
        },
        status: {
            type: 'string'
        },
        user_type: {
            type: 'string'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },
        validationMessages: {
            name: {
                required: 'Name is required'
            },
            email: {
                required: 'Email is required',
                email: 'Enter valid email'
            },
        }
    },
    beforeCreate: function (values, next) {
        bcrypt.hash(values.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};