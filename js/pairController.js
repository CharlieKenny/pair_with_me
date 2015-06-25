pairWithMe.controller('PairWithMeCtrl', ['Search', function(Search) {
  var self = this;

  var yourself = 0;

  window.onload = function() {
    self.cohort.forEach(function(student) {
      Search.query(student.gh_username)
      .then(collectResults)
    })

    function collectResults(response) {
      self.cohort.forEach(function(student) {
        if(student.gh_username == response.data.login) {
          student['avatar_url'] = response.data.avatar_url;
        }
      })
    }
  }

// maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
  self.cohort = [
    {
     name: "Alex",
     gh_username: "AlexHandy1",
     number: 1,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Ashleigh",
     gh_username: "ashleigh090990",
     number: 2,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Jennifer",
     gh_username: "curlygirly",
     number: 3,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Dan B",
     gh_username: "dan-bolger",
     number: 4,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Andy",
     gh_username: "andygout",
     number: 5,
     paired: false,
     pairedWith: ""
    },
    {
     name: "Charlie",
     gh_username: "charliekenny",
     number: 6,
     paired: false,
     pairedWith: ""
    },
        {
     name: "Fiona",
     gh_username: "smarbaf",
     number: 7,
     paired: false,
     pairedWith: ""
    },
        {
     name: "Tim O",
     gh_username: "timoxman",
     number: 8,
     paired: false,
     pairedWith: ""
    }
  ];

  self.pairWith = function(pair){
        console.log("You are paired");
        // not sure why code below this is 'yourself' and not self.yourself?
        console.log(yourself);
        console.log(pair);
        console.log(self.cohort[7].name);
  };

  self.setYourself = function(usernumber){
        yourself = usernumber;
  };

  self.shyPairWith = function(pair){
        console.log("You are shy paired");
        console.log(yourself);
        console.log("random");
  };

  self.isButtonDisplayed = function(usernumber){
    // don't display the button, if you are the person selected, or you already have a pair.
    if ( yourself === usernumber ) return false
    else if ( self.cohort[usernumber-1].pairedWith !== "" ) return false
    else return true;
  };
  
}]);