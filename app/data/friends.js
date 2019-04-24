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
    photo: "https://www.animaker.com/assets/images/icons/comic-male.png",
    scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
  },
  {
    name: "Manila",
    photo: "https://www.animaker.com/assets/images/icons/comic-female.png",
    scores: [1, 2, 1, 2, 1, 2, 1, 2, 1, 1]
  },
  {
    name: "Anchor",
    photo:
      "https://i.graphicmama.com/uploads/2018/4/5ad9eb53d04a5-zander-smartbeard-Beard-Cartoon-Character1.png",
    scores: [5, 4, 4, 4, 5, 4, 2, 5, 4, 5]
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
