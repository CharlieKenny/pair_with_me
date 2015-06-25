pairWithMe.controller('PairWithMeCtrl', function() {
  var self = this;

  var yourself = 0;

// maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
  this.cohort = [
    {
     name: "Alex",
     number: 1,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Ashleigh",
     number: 2,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Jennifer",
     number: 3,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Dan B",
     number: 4,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Andy",
     number: 5,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Charlie",
     number: 6,
     paired: false,
     pairedWith: ""
    },
        {
     name: "Fiona",
     number: 7,
     paired: false,
     pairedWith: ""
    },
        {
     name: "Tim O",
     number: 8,
     paired: false,
     pairedWith: ""
    }
  ];

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


});