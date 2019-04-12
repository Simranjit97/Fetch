const Login = require("../models/login.model.js");

// Create and Save a new Login
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    return res.status(400).send({
      message: "Note: UserId can not be empty"
    });
  }

  // Create a Login
  const login = new Login({
    userName: req.body.userName,
    password: req.body.password
  });

  // Save Login in the database
  login
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Login."
      });
    });
};

// Retrieve and return all surveys from the database.
exports.findAll = (req, res) => {
  Login.find()
    .then(users => {
      console.log(req.body.userName)
      users.forEach(function(value){
        if (value.userName === req.body.userName) {
          if (value.password === req.body.password) {
              //console.log('User Found');
              res.send(value); 
          }
        }
        else{
          //res.send(0);
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Username or password not matching."
      });
    });
};

// Find a single login with a surveyId
exports.findOne = (req, res) => {
  console.log(req.body.userName);
  console.log(req.body.password);

  Login.findById({"userName" : req.body.userName})
    .then(user => {
        console.log(user);

      if (!user) {
        return res.status(404).send({
          message: "Login not found with id " + req.body.userName
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Login not found with id " + req.body.userName
        });
      }
      return res.status(500).send({
        message: "Error retrieving login with id " + req.body.userName
      });
    });
};

// Update a login identified by the surveyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userName) {
    return res.status(400).send({
      message: "Login UserName or Password can not be empty"
    });
  }

  // Find login and update it with the request body
  Login.findByIdAndUpdate(
    req.params.password,
    {
      password: req.body.password
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Login not found with id " + req.params.userName
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Login not found with id " + req.params.userName
        });
      }
      return res.status(500).send({
        message: "Error updating login with id " + req.params.userName
      });
    });
};

// Delete a login with the specified surveyId in the request
exports.delete = (req, res) => {
  Login.findByIdAndRemove(req.params.userName)
    .then(login => {
      if (!login) {
        return res.status(404).send({
          message: "Login not found with id " + req.params.userName
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Login not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Could not delete login with id " + req.params.userName
      });
    });
};