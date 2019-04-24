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

app.get("/api/friends", function(request, respose) {
  respose.json(friends);
});

app.post("/api/friends", function(request, respose) {
  const friend = request.body;
  const bestFriend = findBestFriend(friends, friend);
  friends.push(friend);
  respose.json(bestFriend);
});

function findBestFriend(friends, friend) {
  friends.sort(function(f1, f2) {
    const f1ScoreDiff = compareScore(f1.scores, friend.scores);
    const f2ScoreDiff = compareScore(f2.scores, friend.scores);
    return f1ScoreDiff - f2ScoreDiff;
  });

  return friends[0];
}

function compareScore(score1, score2) {
  let total = 0;
  score1.forEach((score, i) => {
    let diff = Math.abs(score1[i] - score2[i]);
    total = total + diff;
  });
  return total;
}
