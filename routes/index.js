var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'fling.seas.upenn.edu',
  user: 'cadenza',
  password: 'Lzy@199803231900',
  database: 'cadenza'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.get('/reference', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/Recommendations', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'Recommendations.html'));
});

// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = "INSERT IGNORE INTO User Values('" + req.body.username + "','" + req.body.password + "');"; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    // console.log("rows", rows);
    // console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

// get all the user info
router.get('/showAllUsers', function(req, res) {
  var query = "SELECT DISTINCT * FROM User;"; 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get user info error: ', err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});

// get all the movie genres
router.get('/showAllGenres', function(req, res) {
  var query = "SELECT DISTINCT genre FROM Genres;";
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get genres error: ', err);
    else {
      // console.log(rows);
      res.json(rows);
    }
  });
});

// get top moives by genre 
router.get('/showTopMovies/:genre', function(req, res) {
  console.log(req.params.genre);
  var query = "SELECT DISTINCT title, rating, vote_count as votes FROM Movies M, Genres G WHERE G.genre='" + req.params.genre + "' AND G.movie_id=M.id ORDER BY rating DESC, votes DESC LIMIT 10;"; 
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('get top movies error: ', err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});

// get recommended movies 
router.get('/reco/:movieId', function(req, res) {
  console.log(req.params.movieId);
  const TOTAL = 10;
  var key = req.params.movieId;
  var query = "SELECT DISTINCT genre FROM Genres G WHERE G.movie_id=\"" + key + "\";";
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log('get recommendations error: ', err);
    }
    else {
      // rows contain the genres of the movie with id=key
      for (var i in rows){
        console.log(rows[i].genre)
      }
      console.log(rows.length);
      var results = [];
      var lim = Math.floor( TOTAL / Math.min(rows.length,10) );
      console.log(lim);
      for(var i = 0; i < Math.min(rows.length-1,9); i++){
        console.log(rows[i].genre);
        query = "SELECT title, genre " + 
                "FROM Movies M, Genres G " + 
                "WHERE M.id=G.movie_id AND M.id<>\"" + key + "\" AND G.genre=\"" + rows[i].genre + "\" " + 
                "ORDER BY RAND() " + 
                "LIMIT " + lim + ";";
        connection.query(query, function(err,rows,fields){
          if (err){
            response.send({err:err});
          }
          for (var j in rows){
            results.push(rows[j]);
          }
          console.log(results);
          // response.json(rows);
        });
      }
      //TODO: add last genre
      console.log(results);
      res.json(results);
    }
  });
});

// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
