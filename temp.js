// request for top 10 movies in the genre
var req = $http({
    url: '/showTopMovies',
    method: "GET",
    data: {
      'genre': response[i].genre
    }
  });
  req.success(function(res){
    // create a table
    var table = document.createElement("table");
    table.setAttribute("class","panel");
    // insert movie info into the table
    for(var i = 0; i < Math.min(10, res.length); i++){
      var row = table.insertRow(i);
      row.insertCell(0).innerHTML = res[i].title;
      row.insertCell(1).innerHTML = res[i].rating;
      row.insertCell(2).innerHTML = res[i].votes;
    }
    // set table header
    var headerRow = table.createTHead().insertRow(0);
    headerRow.insertCell(0).innerHTML = '<b>Movie title</b>';
    headerRow.insertCell(1).innerHTML = '<b>Rating</b>';
    headerRow.insertCell(2).innerHTML = '<b>Votes</b>';
    // add the table to the entry
    entry.innerHTML += table;
  });
  req.error(function(err){
    entry.innerHTML += '<p class="panel">some error occurred</p>';
    console.log("show top movie by genre error: ", err);
  });

// SELECT DISTINCT title, rating, vote_count as votes FROM Movies M, Genres G WHERE G.genre="Crime" AND G.movie_id=M.id ORDER BY rating DESC, votes DESC;

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== //
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
      $scope.genres = response;
      // $scope.isShowGenres = !$scope.isShowGenres;
      // // get the place to display the list
      // var list = document.getElementById("genresList");
      // // clear the list if exist anything
      // while (list.firstChild) {
      //   list.removeChild(list.firstChild);
      // }
      // // iterate through the genres
      // for(var i = 0; i < response.length; i++){
      //   var entry = document.createElement('dt');
      //   var button = '<button class="accordion" onclick="angular.element(this).scope().showTopMovies(this)">' + response[i].genre + '</button>'; //\'' + response[i].genre + '\'
      //   entry.innerHTML = button;
      //   // end the request
      //   list.appendChild(entry);
      // }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });
  };
  // function to show top movies by genre
  $scope.showTopMovies = function(x){
    document.getElementById("foo").innerHTML += x;
    // // get the list item node
    // var parent = genre.parentNode;
    // // clean orignial data
    // while(genre.nextSibling){
    //   parent.removeChild(genre.nextSibling);
    // }
    // sent request
    var request = $http({
      url: '/showTopMovies',
      method: "POST",
      data: {'genre': genre}//{'genre': genre.innerHTML}
    });
    request.success(function(response){
      // var table = document.createElement("table");
      // // insert movie info into the table
      // for(var i = 0; i < Math.min(10, response.length); i++){
      //   var row = table.insertRow(i);
      //   row.insertCell(0).innerHTML = response[i].title;
      //   row.insertCell(1).innerHTML = response[i].rating;
      //   row.insertCell(2).innerHTML = response[i].votes;
      // }
      // // set table header
      // var headerRow = table.createTHead().insertRow(0);
      // headerRow.insertCell(0).innerHTML = '<b style="font-size:20px;">Movie title</b>';
      // headerRow.insertCell(1).innerHTML = '<b style="font-size:20px;">Rating</b>';
      // headerRow.insertCell(2).innerHTML = '<b style="font-size:20px;">Votes</b>';
      // // add the table to the page
      // parent.appendChild(table);
    }); 
    request.error(function(err){
      console.log("show top movie by genre error: ", err);
    }); 
  };
});
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== //