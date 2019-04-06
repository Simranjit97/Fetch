const Survey = require("../models/note.model.js");

// Create and Save a new Survey
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Note: UserId can not be empty"
    });
  }

  // Create a Survey
  const survey = new Survey({
    userId: req.body.userId,
    questionId: req.body.questionId,
    optionSelected: req.body.optionSelected
  });

  // Save Survey in the database
  survey
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Survey."
      });
    });
};

// Retrieve and return all surveys from the database.
exports.findAll = (req, res) => {
  Survey.find()
    .then(surveys => {
      res.send(surveys);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving surveys."
      });
    });
};

// Find a single survey with a surveyId
exports.findOne = (req, res) => {
  // console.log(req.params);
  Survey.findById(req.params.surveyId)
    .then(survey => {
        // console.log(survey);
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send(survey);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Error retrieving survey with id " + req.params.surveyId
      });
    });
};

// Find a single survey with a surveyId
exports.countByQuestion = (req, res) => {
  // console.log(req.params);
  Survey.find({"questionId": req.params.questionId})
    .count(function(e, count){
      // console.log(count);
      // console.log(e)
      res.send({ "count": count });
    })
    .catch(err => {
      //console.log(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Error retrieving survey with id " + req.params.surveyId
      });
    });
};

// Update a survey identified by the surveyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Survey content can not be empty"
    });
  }

  // Find survey and update it with the request body
  Survey.findByIdAndUpdate(
    req.params.surveyId,
    {
      title: req.body.title || "Untitled Survey",
      content: req.body.content
    },
    { new: true }
  )
    .then(survey => {
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send(survey);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Error updating survey with id " + req.params.surveyId
      });
    });
};

// Delete a survey with the specified surveyId in the request
exports.delete = (req, res) => {
  Survey.findByIdAndRemove(req.params.surveyId)
    .then(survey => {
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send({ message: "Survey deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Could not delete survey with id " + req.params.surveyId
      });
    });
};