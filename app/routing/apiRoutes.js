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
            
            }}
    })
};