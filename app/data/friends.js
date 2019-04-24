var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.listen(PORT, function() {
  console.log("connected: " + PORT);
});

let friends = [
  {
    name: "Ahmed",
    photo:
      "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
  }
];

// HTML routes

app.get("/survey", function(request, respose) {
  respose.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/home", function(request, respose) {
  respose.sendFile(path.join(__dirname, "../public/home.html"));
});

app.post("/api/friends", function(request, respose) {
  const friend = request.body;
  console.log(friend);
  friends.push(friend);
  respose.json(friends);
});
