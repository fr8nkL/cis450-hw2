var app = angular.module('angularjsNodejsTutorial', []);

// Controller of login-container in login.html
app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    })

    request.success(function(response) {
      // success
      console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});

// Controller of user-container in dashboard.html
app.controller('usersController', function($scope, $http) {
  $scope.showUsers = function() {
    var request = $http({
      url: '/showAllUsers',
      method: "GET",
      data: {}
    });
    request.success(function(response){
      // asign the query result to the table cells of the users
      $scope.users = response;
      // make the table visible
      $scope.whetherShowUsers = true;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
});


// Controller of movie-container in dashboard.html
app.controller('movieController', function($scope, $http) {
  // function to show all genres
  $scope.showGenres = function() {
    var request = $http({
      url: '/showAllGenres',
      method: "GET",
      data: {}
    });
    request.success(function(response){
      // asign the query result to the list of genres
      $scope.genres = response;
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
  // function to show top movies by genre
  $scope.showMovies = function(genre){
    var request = $http({
      url: '/showTopMovies/' + genre,
      method: "GET"
    });
    request.success(function(response){
      // assign the genre name
      $scope.genre = genre;
      // assig the top 10 movies to the table cells of top movies within the genre
      $scope.topMovies = response.slice( 0, Math.min(response.length,10) );
      // make the table visible
      $scope.whetherShowMovies = true;
    }); 
    request.error(function(err){
      console.log("show top movie by genre error: ", err);
    }); 
  };
});

// controller of reco-container in Recommendations.html
app.controller('recoController', function($scope, $http) {
  $scope.reco = function() {
    console.log($scope.movieId);
    var request = $http({
      url: '/reco/' + $scope.movieId,
      method: "GET"
    })
    request.success(function(response) {
      console.log('res len = ',response.length);
      console.log(response);
      $scope.whetherShowReco = true;
      $scope.recoResults = response;
      // if(response.length >= 1){
      //   $scope.recoResults = response;
      // }
      // else{
      //   var text ='{"title":"No matching id found!","genre":"Please re-enter"}';
      //   errMesg = JSON.parse(text);
      //   console.log(errMesg.title);
      //   $scope.recoResults = errMesg;
      // }
    });
    request.error(function(err) {
      console.log("recommendation error: ", err);
    });
  };
});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
