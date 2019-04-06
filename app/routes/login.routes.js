module.exports = app => {
    const login = require("../controllers/login.controller.js");
  
    // Create a new Note
    app.post("/signup", login.create);
  
    // Retrieve all Notes
    app.post("/login", login.findAll);
  
    // Retrieve a single Note with surveyId
    app.get("/login/:userId", login.findOne);
  
    // Update a Note with surveyId
    app.put("/login/:userId", login.update);
  
    // Delete a Note with surveyId
    app.delete("/login/:userId", login.delete);
  };
  