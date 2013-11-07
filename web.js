var express = require('express');
var fs = require('fs');
var postmark = require("postmark")(process.env.POSTMARK_API_KEY);
var swig = require('swig');

var app = express(express.logger());

app.use(express.bodyParser());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/');


app.get('/', function(request, response) {
  response.render('index', { });
});

app.post('/contact', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var mobile = request.body.mobile;
  var out = "contact name: " + name + "\tcontact email: " + email + "\tmobile: " + mobile + "\n";
  postmark.send({
    "From": "zumbi@cdoseoul.com",
    "To": "zumbi@cdoseoul.com",
    "Subject": "Free Class Signup Form Submission",
    "TextBody": out,
    "Tag": "registrant"
  }, function(error, success) {
       if(error) {
          console.error("Unable to send via postmark: " + error.message);
         return;
       }
    console.info("Sent to postmark for delivery")
  });

  response.redirect('back');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
