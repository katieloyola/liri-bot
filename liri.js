//GOAL: go to API's and get data (and console log it) by using command line arguments**
require('dotenv').config();

//create variables
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var liriCommands = process.argv[2];
var movieTitle = process.argv[3];

var axios = require("axios");
// var bands = keys.bandsintown.api_key;

var spotify = new Spotify(keys.spotify);

//create commands
  switch (liriCommands) {
    case "spotify-this-song":
      spotifyThis();
      break;

    case "concert-this":
      concertThis();
      break;

    case "movie-this":
      movieThis();
      break;

    case "do-what-it-says":
      randomThis();
      break;

    default:
      console.log("Please try again using the following search terms: 'spotify-this-song', 'concert-this', 'movie-this', or 'do-what-it-says' - following node liri.js");
      break;
  }


//1 - Spotify
function spotifyThis(songTitle) {
  var songTitle = process.argv[3];
  if (!songTitle) {
    songTitle = "American Girl";
  };
  songRequest = songTitle;
  spotify.search({
    type: "track",
    query: songRequest
  },
    function (err, data) {
      //if request is a success
      if (!err) {
        //pull data and console log
        var trackInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (trackInfo[i] != undefined) {
            var spotifyResults =
              "Song: " + trackInfo[i].name + "\n" +
              "Artist: " + trackInfo[i].artists[0].name + "\n" +
              "Album: " + trackInfo[i].album.name + "\n" +
              "Preview URL: " + trackInfo[i].preview_url
            //console log
            console.log("\n-----------------\n");
            console.log(spotifyResults);
            console.log("\n-----------------\n");
          };
        };
      } else {
        console.log("error: " + err);
        return;
      };
    });
};

//2 - Bands In Town - use axios
function concertThis() {

}

//3 - OMDB - use axios
function movieThis() {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    //if request comes back successful
    if (!error && response.statusCode === 200) {
      // console.log('success');
      //pull data and console log
      var myMovieData = JSON.parse(body);
      var omdbResults =
        "Title: " + myMovieData.Title + "\n" +
        "Year: " + myMovieData.Year + "\n" +
        "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
        "Origin Country: " + myMovieData.Country + "\n" +
        "Language: " + myMovieData.Language + "\n" +
        "Plot: " + myMovieData.Plot + "\n" +
        "Actors: " + myMovieData.Actors + "\n" +
        //console log
        console.log("\n-----------------\n");
        console.log(omdbResults);
      console.log("\n-----------------\n");
    } else {
      console.log("error: " + err);
      return;
    };
  });
};

//4 - random.txt read file
//creates new file called "random.txt"
function randomThis() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var splitData = data.split(',');

    console.log("\n-------------------\n");
    if (splitData[0] === 'spotify-this-song') {
      spotifyThis(splitData[1])
    } else if (splitData[0] === 'concert-this') {
      concertThis(splitData[1])
    } else if (splitData[0] === 'movie-this') {
      movieThis(splitData[1])
    } else {
      console.log('I am sorry, I do not understand - please try again');
    }
  });
}


