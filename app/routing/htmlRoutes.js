var path = require("path");

// Exports
module.exports = function(app) {
  // Survey request
  app.get("/survey", function(request, response) {
    response.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // anything requesting getting to HTML home page
  app.get("*", function(request, response) {
    response.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
