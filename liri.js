var accessCodes = require("./keys.js");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
// console.log(accessCodes.twitterKeys.consumer_key);

var client = new twitter({
  consumer_key: accessCodes.twitterKeys.consumer_key,
  consumer_secret: accessCodes.twitterKeys.consumer_secret,
  access_token_key: accessCodes.twitterKeys.access_token_key,
  access_token_secret: accessCodes.twitterKeys.access_token_secret
});

// console.log(client);
var userInput = process.argv[2];
// var userInput = process.argv.splice(2).join();
var search = process.argv.splice(3).join(" ");

// console.log(userInput);
// console.log("Search Term " + search);

fs.appendFile("log.txt", "\n" + userInput + " " + search + ":\n", function(err) {
  if (err) {
    return console.log(err);
  }
});

function songs() {

  var spotify = new Spotify({
    id: '3a480c646708407e9e23a97c53409806',
    secret: '3f58983811194be7ac8379f3a7a89fc1'
  });

  if (!search) {

    console.log(" ");
    console.log("Artist: Ace of Base");
    console.log(" ");
    console.log("Track: The Sign");
    console.log(" ");
    console.log("Album: The Sign (US Album) [Remastered]");
    console.log(" ");
    console.log("Album Preview: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
    console.log(" ");
    console.log("=========================================");

    fs.appendFile("log.txt", "\n" + "Artist: Ace of Base" + "\nTrack: The Sign" + "\nAlbum: The Sign (US Album) [Remastered]" + "\nAlbum Preview: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE" + "\n===========================" + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });

  } else {
    spotify.search({
      type: 'track',
      query: search,
      limit: 1
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var result = data.tracks.items[0];

      console.log(" ");
      console.log("Artist: " + result.artists[0].name);
      console.log(" ");
      console.log("Track: " + result.name);
      console.log(" ");
      console.log("Album: " + result.album.name);
      console.log(" ");
      console.log("Album Preview: " + result.external_urls.spotify);
      console.log(" ");
      console.log("=========================================");

      fs.appendFile("log.txt", "\n" + "Artist: " + result.artists[0].name + "\nTrack: " + result.name + "\nAlbum: " + result.album.name + "\nAlbum Preview: " + result.external_urls.spotify + "\n===========================" + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  }
}


if (userInput === "my-tweets") {
  // console.log("You chose my-tweets");


  var params = {
    screen_name: '@fakeDevTrump'
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      if (tweets.length <= 20) {

        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text);
          console.log(" ");
          console.log(tweets[i].created_at);
          console.log(" ");
          console.log("=================================");
          console.log(" ");

          fs.appendFile("log.txt", "\n" + tweets[i].text + "\n " + tweets[i].created_at + "\n===========================" + "\n", function(err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      } else {

        for (var j = 0; j < 20; j++) {
          console.log(tweets[j].text);
          console.log(" ");
          console.log(tweets[j].created_at);
          console.log(" ");
          console.log("=================================");
          console.log(" ");
        }

        fs.appendFile("log.txt", "\n" + tweets[i].text + "\n " + tweets[i].created_at + "\n===========================" + "\n", function(err) {
          if (err) {
            return console.log(err);
          }
        });

      }

    }
  });

} else if (userInput === "spotify-this-song") {
  // console.log("You chose spotify");

  songs();

} else if (userInput === "movie-this") {
  // console.log("You chose movie");

  if (!search) {
    search = "Mr. Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    // ...
    if (!error && response.statusCode === 200) {
    // Then log the Release Year for the movie
    // ...
    var movie = JSON.parse(body);

    // console.log(movie);
    console.log(" ");
    console.log("Title: " + movie.Title);
    console.log("Released: " + movie.Year);
    console.log("IMDB Rating: " + movie.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
    console.log("Country: " + movie.Country);
    console.log("Language: " + movie.Language);
    console.log("Plot: " + movie.Plot);
    console.log("Cast: " + movie.Actors);
    console.log(" ");
    }

    fs.appendFile("log.txt", "\nTitle: " + movie.Title + "\nReleased: " + movie.Year + "\nIMDB Rating: " + movie.Ratings[0].Value + "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + "\nCountry: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nCast: " + movie.Actors + "\n===========================" + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });

} else if (userInput === "do-what-it-says") {
  // console.log("You chose to do what it says");

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    userInput = dataArr[0];
    search = dataArr[1];

    songs();

  });

} else {
  console.log("Please choose a valid input.");
}
