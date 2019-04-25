var friends = require("../data/friends");

module.exports= function(app) {
  // API routes to post
  app.post("/api/friends", function(request, respose) {
    const friend = request.body;
    const bestFriend = findBestFriend(friends, friend);
    friends.push(friend);
    respose.json(bestFriend);
  });
  //API route to get
  app.get("/api/friends", function(request, respose) {
    respose.json(friends);
  });
};
//find the best match
function findBestFriend(friends, friend) {
  friends.sort(function(f1, f2) {
    const f1ScoreDiff = compareScore(f1.scores, friend.scores);
    const f2ScoreDiff = compareScore(f2.scores, friend.scores);
    return f1ScoreDiff - f2ScoreDiff;
  });

  return friends[0];
}
//  Compare scores
function compareScore(score1, score2) {
  let total = 0;
  score1.forEach((score, i) => {
    let diff = Math.abs(score1[i] - score2[i]);
    total = total + diff;
  });
  return total;
}
