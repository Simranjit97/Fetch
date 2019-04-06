module.exports = app => {
  const surveys = require("../controllers/note.controller.js");

  // Create a new Note
  app.post("/createSurvey", surveys.create);

  // Retrieve all Notes
  app.get("/surveys", surveys.findAll);

  // Retrieve a single Note with surveyId
  app.get("/surveys/:surveyId", surveys.findOne);

  // Update a Note with surveyId
  app.put("/surveys/:surveyId", surveys.update);

  // Delete a Note with surveyId
  app.delete("/surveys/:surveyId", surveys.delete);
};
