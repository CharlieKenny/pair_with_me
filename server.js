var express = require('express')

var app = express();
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pairs')
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  var pairSchema = mongoose.Schema(
    {
      username: String,
      gh_username: String,
      pair_id: { type: Number, max: 100 },
      paired: Boolean
    })

  var User = mongoose.model('User', pairSchema)

  var cohort = [
   {
    username: "Alex",
    gh_username: "AlexHandy1",
    pair_id: 1,
    paired: false
   },
   {
    username: "Ashleigh",
    gh_username: "ashleigh090990",
    pair_id: 2,
    paired: false
   },
   {
    username: "Jennifer",
    gh_username: "curlygirly",
    pair_id: 3,
    paired: false
   },
   {
    username: "Dan B",
    gh_username: "dan-bolger",
    pair_id: 4,
    paired: false
   },
   {
    username: "Andy",
    gh_username: "andygout",
    pair_id: 5,
    paired: false
   },
   {
    username: "Charlie",
    gh_username: "CharlieKenny",
    pair_id: 6,
    paired: false
   },
   {
    username: "Fiona",
    gh_username: "smarbaf",
    pair_id: 7,
    paired: false
   },
   {
    username: "Tim O",
    gh_username: "timoxman",
    pair_id: 8,
    paired: false
   },
   {
    username: "Rodney",
    gh_username: "rodcul",
    pair_id: 9,
    paired: false
   },
   {
    username: "Anna",
    gh_username: "AnnaKL",
    pair_id: 10,
    paired: false
   },
   {
    username: "Mollie",
    gh_username: "MollieS",
    pair_id: 11,
    paired: false
   },
   {
    username: "Rocco",
    gh_username: "bagolol",
    pair_id: 12,
    paired: false
   },
   {
    username: "Daryl",
    gh_username: "dwatson62",
    pair_id: 13,
    paired: false
   },
   {
    username: "Chris",
    gh_username: "cmanessis",
    pair_id: 14,
    paired: false
   },
   {
    username: "Joanne",
    gh_username: "zanetton",
    pair_id: 15,
    paired: false
   },
   {
    username: "Chidu",
    gh_username: "chidumaga",
    pair_id: 16,
    paired: false
   },
   {
    username: "Stefan",
    gh_username: "stefan22",
    pair_id: 17,
    paired: false
   },
   {
    username: "Daniel",
    gh_username: "DanielJohnston",
    pair_id: 18,
    paired: false
   },
   {
    username: "Tim R",
    gh_username: "timrobertson0122",
    pair_id: 19,
    paired: false
   },
   {
    username: "Mystery Pair",
    gh_username: "sanjsanj",
    pair_id: 20,
    paired: false
   }
 ];

// comment this fucker out tomorrow - drop the db first then only allow the below to happen once
// cheers!
 // User.collection.insert(cohort, onInsert);

 function onInsert(err, docs) {
    if (err) {
      console.log('your mother');
    } else {
      console.info('%d users were successfully stored. Go you.', docs.length);
    }
 }

  console.log("We are connected")

  app.get('/users', function(req, res, next) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  });
});

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Listening on: ', app.get('port'));
});

module.exports = app;