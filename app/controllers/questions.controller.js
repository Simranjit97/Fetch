const Question = require("../models/questions.model.js");

// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Note: UserName can not be empty"
    });
  }

  // Create a Question
  const question = new Question({
    userId: req.body.userId,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4
  });

  // Save Question in the database
  question
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });
};

// Retrieve and return all surveys from the database.
exports.findAll = (req, res) => {
  Question.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: "Username or password not matching."
      });
    });
};

// Find a all questions with a userName
exports.findOne = (req, res) => {
  // console.log(req.params);
  Question.find()
    .then(users => {
      //res.send(users);
      var q = [];
      users.forEach(value => {
        //console.log(value);
        if (value.userId == req.params.userId) {
          q.push(value);
        }
      });
      if (q.length > 0) {
        res.send(q);
      }else{
        res.send(0);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "User has not created Questions"
      });
    });
};

// Update a login identified by the surveyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userName) {
    return res.status(400).send({
      message: "Question UserName or Password can not be empty"
    });
  }

  // Find login and update it with the request body
  Question.findByIdAndUpdate(
    req.params.password,
    {
      password: req.body.password
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Question not found with id " + req.params.userName
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Question not found with id " + req.params.userName
        });
      }
      return res.status(500).send({
        message: "Error updating login with id " + req.params.userName
      });
    });
};

// Delete a login with the specified surveyId in the request
exports.delete = (req, res) => {
  Question.findByIdAndRemove(req.params.userName)
    .then(login => {
      if (!login) {
        return res.status(404).send({
          message: "Question not found with id " + req.params.userName
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Question not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Could not delete login with id " + req.params.userName
      });
    });
};
