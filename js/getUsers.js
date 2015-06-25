pairWithMe.factory('GetUsers', ['$http', function($http) {
  var url = "/users"

  return $http.get(url); //returns a success and error functionality that can call in controller

  // return {
  //   query: function() {
  //     return $http({
  //       url: url,
  //       method: 'GET'
  //     })
  //   }
  // }
}])