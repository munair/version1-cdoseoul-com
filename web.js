var express = require('express');
var fs = require('fs');
var postmark = require('postmark')(process.env.POSTMARK_API_KEY);
var swig = require('swig');

var app = express(express.logger());

app.use(express.bodyParser());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('form subject', 'initializing value');
app.set('views', __dirname + '/');


app.get('/', function(request, response) {
  app.set('form subject', 'Free Class Request');
  response.render('index', { });
});

app.get('/meditation', function(request, response) {
  app.set('form subject', 'Reservation for Capoeira + Meditation');
  response.render('meditation', { });
});

app.post('/contact', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var mobile = request.body.mobile;
  var referral = request.body.referral;
  var validation = request.body.validation;
  var out = 'contact name: ' + name 
	  + '\ncontact email: ' + email 
	  + '\nmobile: ' + mobile 
	  + '\nreferral: ' + referral 
	  + '\nvalidation: ' + validation 
	  + '\n';
  postmark.send({
    'From': 'zumbi@cdoseoul.com',
    'To': 'zumbi@cdoseoul.com',
    'Subject': app.get('form subject'),
    'TextBody': out,
  }, function(error, success) {
       if(error) {
          console.error('Unable to send via postmark: ' + error.message);
         return;
       }
    console.info('Sent to postmark for delivery')
  });

  response.redirect('back');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
