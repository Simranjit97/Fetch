const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    userName: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Login', LoginSchema);