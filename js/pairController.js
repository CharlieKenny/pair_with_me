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

  self.choice = '';


  self.relations =[
                    // {"pair1": 0, "pair2": 1}
                    // {"pair1": 3, "pair2": 4}
                    // {"pair1": 7, "pair2": 0}
                  ];
  // self.blacklist = [
  //                   {"blacklistOwner: 1, "members"{[0,2,3,4]} }
  //                   ];

  this.pairWith = function(pair){
    if (yourself !== 0){
        self.cohort[pair-1].paired = true;
        self.cohort[yourself-1].paired = true;
        var relationship = {"pair1": yourself, "pair2": pair};
        self.relations.push(relationship);
        self.choice = self.cohort[yourself-1].name + ' has been paired with ' + self.cohort[pair-1].name;
    }
  };

  this.setYourself = function(usernumber){
    yourself = usernumber;
  };

  this.pairedWithMe = function(userNumber){
        var noOfPairs = 0;
        self.relations.forEach(function(relationship){
            // if ( relationship.pair1 === yourself && relationship.pair2 === userNumber )
            //     { noOfPairs++ };
            // if ( relationship.pair2 === yourself && relationship.pair1 === userNumber )
            //     { noOfPairs++ };
            // return noOfPairs;
        });
            return 0;
  };


  this.shyPairWith = function(pair){
        console.log("You are shy paired");
        console.log(yourself);
        console.log("random");
  };

  this.isButtonDisplayed = function(usernumber){
    // don't display the button, if you are the person selected, or you the maker already have a pair or yourself already has a pair.
    if ( yourself == 0 ) return false;  // can't pair if you haven't selected yourself
    if ( yourself === usernumber ) return false
    else if ( self.cohort[usernumber-1].paired === true ) return false
    else if ( self.cohort[yourself-1].paired === true ) return false
    else return true;
  };

  this.displayFinalPairs = function(usernumber){
        alert("Ashley has paired with Alex again, \nTim has paired with Andy, \nStefan is with Bristol ");
  };

}]);