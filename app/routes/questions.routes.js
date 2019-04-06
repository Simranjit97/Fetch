module.exports = app => {
    const questions = require("../controllers/questions.controller.js");
  
    // Create a new Note
    app.post("/createQuestion", questions.create);
  
    // Retrieve all Notes
    app.get("/questions", questions.findAll);
  
    // Retrieve a single Note with surveyId
    app.get("/questions/:userId", questions.findOne);
  
    // Update a Note with surveyId
    app.put("/questions/:userId", questions.update);
  
    // Delete a Note with surveyId
    app.delete("/questions/:userId", questions.delete);
  };