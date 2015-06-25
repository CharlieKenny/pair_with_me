pairWithMe.controller('PairWithMeCtrl', ['GetUsers', function(GetUsers) {
  var self = this;

  var yourself = 0;

  GetUsers.success(function(data) {
    console.log(data)
    self.cohort = data;
  }).error(function(data, status){
    console.log(data, status);
        self.cohort = [];
  });

  this.pairWith = function(pair){
        console.log("You are paired");
        // not sure why code below this is 'yourself' and not self.yourself?
        console.log(yourself);
        console.log(pair);
        console.log(this.cohort[7].name);
  };

  this.setYourself = function(usernumber){
    yourself = usernumber;
  };

  this.shyPairWith = function(pair){
        console.log("You are shy paired");
        console.log(yourself);
        console.log("random");
  };

  this.isButtonDisplayed = function(usernumber){
    // don't display the button, if you are the person selected, or you already have a pair.
    if ( yourself === usernumber ) return false
    else if ( self.cohort[usernumber-1].pairedWith !== "" ) return false
    else return true;
  };


}]);