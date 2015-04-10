var passwordHash = require('password-hash');
module.exports = {
    schema: true,
    attributes: {
        first_name: {
            type: 'string',
            maxLength: 75
        },
        last_name: {
            type: 'string',
            maxLength: 75
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
        gender: {
            type: 'string'
        },
        contact_no: {
            type: 'string'
        },
        profile_pic: {
            type: 'string'
        },
        language: {
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
        values.password = passwordHash.generate(values.password);
        next();
    }
};