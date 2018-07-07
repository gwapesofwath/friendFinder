// our apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var path = require("path");

var userArray = require("../data/friends.js");

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(userArray);
    });


    app.post('/api/friends', function (req, res) {

        // Capture the user input object
        var newUserInput = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        console.log('new User Input name - ' + req.body.name);
        // store newUserInput scores in the array
        var scoresArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]))
        }
        newUserInput.scores = scoresArray;
        console.log('new User Input Scores  Array = ' + scoresArray);

        //  check the new User Input entry with the existing ones
        var scoreDiffArray = [];
        for (var i = 0; i < userArray.length; i++) {

            // Check each friend's scores and summarize the difference 
            var scoreDiff = 0;
            for (var j = 0; j < newUserInput.scores.length; j++) {
                scoreDiff += Math.abs(newUserInput.scores[j] - userArray[i].scores[j]);
                console.log('scoreDifference = ' + scoreDiff + "  j = " + j);
            }
            // summ of differences for each friend and new User store in the array
            scoreDiffArray.push(scoreDiff);
            console.log('scoreDiffArray for each object in the friends array = ' + scoreDiffArray + " i = " + i);
        }
        console.log('scoreDiffArray TOTAL = ' + scoreDiffArray);

        // Determine the best match using the postion of the best match in the friends array
        var bestMatchPosition = 0;
        for (var i = 1; i < scoreDiffArray.length; i++) {

            if (scoreDiffArray[i] <= scoreDiffArray[bestMatchPosition]) {
                bestMatchPosition = i;

            }

        }
        //return best Match data
        var bestFriendMatch = userArray[bestMatchPosition];
        res.json(bestFriendMatch);

        //pushes the new userInput into the friends array
        userArray.push(newUserInput);

    });

}
