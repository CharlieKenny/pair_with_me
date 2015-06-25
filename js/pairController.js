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
                    //  {"pair1": 6, "pair2": 7}
                    // {"pair1": 3, "pair2": 4},
                    // {"pair1": 7, "pair2": 0}
                  ];
  // self.blacklist = [
  //                   {"blacklistOwner: 1, "members"{[0,2,3,4]} }
  //                   ];

  this.pairWith = function(maker){
    if (yourself !== 0){
        self.cohort[maker.pair_id-1].paired = true;
        self.cohort[yourself-1].paired = true;
        var relationship = {"pair1": yourself, "pair2": maker.pair_id};
        self.relations.push(relationship);
        self.choice = self.cohort[yourself-1].username + ' has been paired with ' + self.cohort[maker.pair_id-1].username;
    }
  };

  this.setYourself = function(usernumber){
    yourself = usernumber;
  };

  this.pairedWithMe = function(maker){
        var noOfPairs = 0;
        self.relations.forEach(function(relationship){
          if ( relationship.pair1 === yourself && relationship.pair2 === maker.pair_id )
            { noOfPairs++ };
          if ( relationship.pair2 === yourself && relationship.pair1 === maker.pair_id )
            { noOfPairs++ };
        });
            return noOfPairs;
  };

  this.shyPairWith = function(pair){
        console.log("You are shy paired");
        console.log(yourself);
        console.log("random");
  };

  this.isButtonDisplayed = function(maker){
    // don't display the button, if you are the person selected, or you the maker already have a pair or yourself already has a pair.
    if ( yourself == 0 ) return false;  // can't pair if you haven't selected yourself
    if ( yourself === maker.pair_id ) return false
    else if ( self.cohort[maker.pair_id-1].paired === true ) return false
    else if ( self.cohort[yourself-1].paired === true ) return false
    else return true;
  };

  this.displayFinalPairs = function(){
        alert("Ashleigh has paired with Alex again, \nTim has paired with Andy, \nStefan is with Bristol ");
  };

}]);