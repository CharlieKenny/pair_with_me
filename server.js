var express = require('express')

var app = express();
var path = require('path')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pairs')
// 27017
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  var pairSchema = mongoose.Schema(
    {
      username: String
    }
  )
  var User = mongoose.model('User', pairSchema)
  var Alex = new User({username: 'Alex'})
  var Dan = new User({username: 'Dan'})

  Alex.save(function (err) {
    if (err) return console.error(err);
  });
  Dan.save(function (err) {
    if (err) return console.error(err);
  });

  console.log("We are connected")
  console.log(Alex.username);
  console.log(Dan.username);
});

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Listening on: ', app.get('port'));
});

module.exports = app;