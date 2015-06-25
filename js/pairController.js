pairWithMe.controller('PairWithMeCtrl', function() {
  var self = this;

  var yourself = 0;

  self.choice = '';

// maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
  self.cohort = [
    {
     username: "Alex",
     pair_id: 1,
     paired: false
    },
    {
     username: "Ashleigh",
     pair_id: 2,
     paired: false
    },
    {
     username: "Andy",
     pair_id: 3,
     paired: false
    },
    {
     username: "Charlie",
     pair_id: 4,
     paired: false
    },
    {
     username: "Dan B",
     pair_id: 5,
     paired: false
    },
    {
     username: "Fiona",
     pair_id: 6,
     paired: false
    },
        {
     username: "Jennifer",
     pair_id: 7,
     paired: false
    },
        {
     username: "Tim O",
     pair_id: 8,
     paired: false
    }
  ];

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

  this.setYourself = function(maker){
        yourself = maker.pair_id;
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

});