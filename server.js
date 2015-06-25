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
    gh_username: "charliekenny",
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