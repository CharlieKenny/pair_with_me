pairWithMe.controller('PairWithMeCtrl', ['GetUsers', 'Search', function(GetUsers, Search) {

  var self = this;

  var yourself = 0;

  window.onload = function() {

    GetUsers.success(function(data) {
      console.log(data)
      self.cohort = data;
      acquireAvatars();
    }).error(function(data, status){
      console.log(data, status);
      self.cohort = [];
    });

    function acquireAvatars() {
      self.cohort.forEach(function(student) {
        Search.query(student.gh_username)
        .then(collectResults);
      });

      function collectResults(response) {
        self.cohort.forEach(function(student) {
          if(student.gh_username == response.data.login) {
            student['avatar_url'] = response.data.avatar_url;
          }
        });
      }
    }
  }

<<<<<<< HEAD
// maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
  // pairWithpp
  GetUsers.success(function(data) {
    console.log(data)
    self.cohort = data;
  }).error(function(data, status){
    console.log(data, status);
        self.cohort = [];
  });
=======
// // maybe better to split the relationships into a seperate data store, rather than include them within each maker within cohort
//   self.cohort = [
//     {
//      name: "Alex",
//      gh_username: "AlexHandy1",
//      number: 1,
//      paired: false
//     },
//     {
//      name: "Ashleigh",
//      gh_username: "ashleigh090990",
//      number: 2,
//      paired: false
//     },
//     {
//      name: "Jennifer",
//      gh_username: "curlygirly",
//      number: 3,
//      paired: false
//     },
//     {
//      name: "Dan B",
//      gh_username: "dan-bolger",
//      number: 4,
//      paired: false
//     },
//     {
//      name: "Andy",
//      gh_username: "andygout",
//      number: 5,
//      paired: false
//     },
//     {
//      name: "Charlie",
//      gh_username: "charliekenny",
//      number: 6,
//      paired: false
//     },
//     {
//      name: "Fiona",
//      gh_username: "smarbaf",
//      number: 7,
//      paired: false
//     },
//     {
//      name: "Tim O",
//      gh_username: "timoxman",
//      number: 8,
//      paired: false
//     }
//   ]


>>>>>>> a89600ad427c382b40895cae99ed28a2a885d461

  self.choice = '';

  self.relations =[
                    //  {"pair1": 6, "pair2": 7}
                    // {"pair1": 3, "pair2": 4},
                    // {"pair1": 7, "pair2": 0}
                  ];
  self.blackList = [
  //                   {"blacklister": 1, "blacklisted": 4 }
                   ];

// creates a pairing between yourself and the maker passed in
  self.pairWith = function(maker){
    if (yourself !== 0){
      self.cohort[maker.pair_id-1].paired = true;
      self.cohort[yourself-1].paired = true;
      var relationship = {"pair1": yourself, "pair2": maker.pair_id};
      self.relations.push(relationship);
      self.choice = self.cohort[yourself-1].username + ' has been paired with ' + self.cohort[maker.pair_id-1].username;

    }
  };

// sets the maker passed to be 'yourself'
  self.setYourself = function(maker){
    yourself = maker.pair_id;
  };

// returns the number of times the maker passed in has been paired with 'yourself'
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

// creates a relationship between 'yourself' and a random other'
  self.shyPairWith = function(){
    var x = this.findUnmatchedPair();
    this.pairWith(self.cohort[x]);
  };

// finds a random maker's pair_ID who has not already been paired and not myself
  this.findUnmatchedPair = function(){
    var x = Math.floor((Math.random() * self.cohort.length) + 0);
    if (self.cohort[x].paired || self.cohort[x].pair_id === yourself) x = this.findUnmatchedPair();
    return x;
   };

// checks whether to display the pair button next to each makers name
  self.isPairButtonDisplayed = function(maker){
    // don't display the button, if you are the person selected, or you the maker already have a pair or yourself already has a pair.
    if ( yourself == 0 ) return false;  // can't pair if you haven't selected yourself
    if ( yourself === maker.pair_id ) return false
    else if ( self.cohort[maker.pair_id-1].paired === true ) return false
    else if ( self.cohort[yourself-1].paired === true ) return false
    else if (self._isOnBlacklist(maker)) return false
    else return true;
  };

<<<<<<< HEAD
// decide if to display question
  self.isQuestionDisplayed = function(){
    return yourself;
  }
=======
// checks whether to dispay the blacklist button
  this.isBlackListButtonDisplayed = function(maker){
    if ( yourself == 0 ) return false;
    if ( yourself === maker.pair_id ) return false;
    if (self._isMakerBlacklisted(maker)) return false;
    return true;
  };

// creates a record on the blacklist array between yourself and blacklister.
  this.blackListMaker = function(maker){
    var blacklistPair = {"blacklister": yourself, "blacklisted": maker.pair_id }
    self.blackList.push(blacklistPair);
  };

// return true if 'yourself' has blacklisted the maker passed in.
  this._isMakerBlacklisted = function(maker){
    var returnvalue = false;
    self.blackList.forEach(function(blacklistPair){
      if ( (blacklistPair.blacklister === yourself) && (blacklistPair.blacklisted === maker.pair_id) ) {
        returnvalue = true;
        return;
      };
    });
    return returnvalue;
  };

// return true if the maker has blacklisted 'yourself' or 'yourself' has blacklisted the maker passed in.
  self._isOnBlacklist = function(maker){
    var returnvalue = false;
    self.blackList.forEach(function(blacklistPair){
      //this if statement is copied above - refactor?
      if ( (blacklistPair.blacklister === yourself) && (blacklistPair.blacklisted === maker.pair_id) ) {
        returnvalue = true;
        return;
      };
      if ( !returnvalue && blacklistPair.blacklister === maker.pair_id && blacklistPair.blacklisted === yourself ) {
        returnvalue = true;
        return;
      };
    });
    return returnvalue;
  };

// checks whether to display the unblacklist button
  self.isUnBlackListButtonDisplayed = function(maker){
    if ( yourself == 0 ) return false;
    if ( yourself === maker.pair_id ) return false;
    if (self._isMakerBlacklisted(maker)) return true;
    return false;
  };
>>>>>>> a89600ad427c382b40895cae99ed28a2a885d461

  self.displayFinalPairs = function(){
    alert("Ashleigh has paired with Alex again, \nTim has paired with Andy, \nStefan is with Bristol ");
  };

// removes a record from the blacklist record
  self.unBlackListMaker = function(maker){
    self.blackList.forEach(function(blacklistPair,index){
      if ( blacklistPair.blacklister === yourself && blacklistPair.blacklisted === maker.pair_id ) {
        var x = self.blackList.splice(index,1);
        return;
      };
    });
  };

}]);