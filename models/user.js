const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    role: {
        type: String,
        require: true
    },
    roleId: {
        type: Number,
        require: true
    },
    createdBy: {
        type: String,
    }
    ,
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        require: true,
        // validate: {
        //     validator: function (v) {
        //         return /^(?=.*[a-z])(?=.*[A-Z])[a-zA-z\\d@$#!%*?&](?=.*\\d)(?=.*[@$#!%*?&])+$/.test(v);
        //     },
        //     message: props => `${props.value} password not match requirements`
        // }
    },
    mobile: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true
    },
    addressLine1: {
        type: String,
        require: true
    },
    addressLine2: {
        type: String,
        require: true
    },
    pincode: {
        type: String,
        require: true
    },
    highSchoolName: {
        type: String,
        require: true
    },
    highSchoolPercentage: {
        type: Number,
        require: true
    },
    intermediateSchoolName: {
        type: String,
        require: true
    },
    intermediateSchoolPercentage: {
        type: Number,
        require: true
    },
    collegeName: {
        type: String,
        require: true
    },
    collegePercentage: {
        type: String,
        require: true
    }
});


//pre hook to encrypt password
userSchema.pre('save', async function (next) {
    this.firstName = await this.firstName.charAt(0).toUpperCase() +
        this.firstName.slice(1);
    this.lastName = await this.lastName.charAt(0).toUpperCase() +
        this.lastName.slice(1);
    //encrypt password
    this.password = await bcrypt.hash(this.password, 10);
    next();

});

module.exports = mongoose.model('users', userSchema);