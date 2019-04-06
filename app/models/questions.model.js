const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    userId: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);