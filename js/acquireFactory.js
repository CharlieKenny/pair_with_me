pairWithMe.factory('Search', ['$http', function($http) {

  var queryUrl = 'https://api.github.com/search/users';

  return {
    query: function(username) {
      return $http({
        url: 'https://api.github.com/users/' + username,
        method: 'GET',
        params: {
          'access_token': accessToken
        }
      });
    }
  }
}]);