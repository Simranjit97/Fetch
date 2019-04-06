const mongoose = require('mongoose');

const SurveySchema = mongoose.Schema({
    userId: String,
    questionId: String,
    optionSelected: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey', SurveySchema);