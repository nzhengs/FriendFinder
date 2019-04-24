app.get("/survey", function(request, respose) {
    respose.sendfile(path.join(__dirname, "../public/survey.html"));
  });
  
  app.get("/home", function(request, respose) {
    respose.sendfile(path.join(__dirname, "../public/home.html"));
  });