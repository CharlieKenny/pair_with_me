pairWithMe.controller('PairWithMeCtrl', ['GetUsers', 'Search', function(GetUsers, Search) {

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
     paired: false
    },
    {
     name: "Ashleigh",
     gh_username: "ashleigh090990",
     number: 2,
     paired: false
    },
    {
     name: "Jennifer",
     gh_username: "curlygirly",
     number: 3,
     paired: false
    },
    {
     name: "Dan B",
     gh_username: "dan-bolger",
     number: 4,
     paired: false
    },
    {
     name: "Andy",
     gh_username: "andygout",
     number: 5,
     paired: false
    },
    {
     name: "Charlie",
     gh_username: "charliekenny",
     number: 6,
     paired: false
    },
    {
     name: "Fiona",
     gh_username: "smarbaf",
     number: 7,
     paired: false
    },
    {
     name: "Tim O",
     gh_username: "timoxman",
     number: 8,
     paired: false
    }
  ]

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

  self.pairWith = function(maker){
    if (yourself !== 0){
      self.cohort[maker.pair_id-1].paired = true;
      self.cohort[yourself-1].paired = true;
      var relationship = {"pair1": yourself, "pair2": maker.pair_id};
      self.relations.push(relationship);
      self.choice = self.cohort[yourself-1].username + ' has been paired with ' + self.cohort[maker.pair_id-1].username;
    }
  };

  self.setYourself = function(maker){
    yourself = maker.pair_id;
  };

  self.pairedWithMe = function(maker){
    var noOfPairs = 0;
    self.relations.forEach(function(relationship){
      if ( relationship.pair1 === yourself && relationship.pair2 === maker.pair_id )
        { noOfPairs++ };
      if ( relationship.pair2 === yourself && relationship.pair1 === maker.pair_id )
        { noOfPairs++ };
    });
    return noOfPairs;
  };

  self.shyPairWith = function(pair){
    console.log("You are shy paired");
    console.log(yourself);
    console.log("random");
  };

  self.isButtonDisplayed = function(maker){
    // don't display the button, if you are the person selected, or you the maker already have a pair or yourself already has a pair.
    if ( yourself == 0 ) return false;  // can't pair if you haven't selected yourself
    if ( yourself === maker.pair_id ) return false
    else if ( self.cohort[maker.pair_id-1].paired === true ) return false
    else if ( self.cohort[yourself-1].paired === true ) return false
    else return true;
  };

  self.displayFinalPairs = function(){
    alert("Ashleigh has paired with Alex again, \nTim has paired with Andy, \nStefan is with Bristol ");
  };
}]);