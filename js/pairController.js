pairWithMe.controller('PairWithMeCtrl', function() {
  var self = this;

  var yourself = 0;

// maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
  self.cohort = [
    {
     name: "Alex",
     id: 1,
     paired: false
    },
    {
     name: "Ashleigh",
     id: 2,
     paired: false
    },
    {
     name: "Jennifer",
     id: 3,
     paired: false
    },
    {
     name: "Dan B",
     id: 4,
     paired: false
    },
    {
     name: "Andy",
     id: 5,
     paired: false
    },
    {
     name: "Charlie",
     id: 6,
     paired: false
    },
        {
     name: "Fiona",
     id: 7,
     paired: false
    },
        {
     name: "Tim O",
     id: 8,
     paired: false
    }
  ];
  self.relations =[];

  this.pairWith = function(pair){
    if (yourself !== 0){
        self.cohort[pair-1].paired = true;
        self.cohort[yourself-1].paired = true;
        var relationship = {"pair1": yourself, "pair2": pair};
        self.relations.push(relationship);
    }
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
    else if ( self.cohort[usernumber-1].paired === true ) return false
    else return true;
  };


});