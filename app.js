const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");



//let User = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 
});

app.get('/contact', function(req, res, next) {
  res.render('contact');
 
});

app.post('/send', function(req, res, next) {
  const output = `
  <p>You have a new contact request</p>
  <h3>Const details</h3>
  <ul>
    <li>First Name: ${req.body.firstname}</li>
    <li>las Name: ${req.body.lastname}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>Subject: ${req.body.subject}</p>
  `;
  //nodemailler code 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'adissoujack@gmail.com', // generated ethereal user
        pass: 'qaeb rzqm eqpk vyrw'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <adissoujack@gmail.com>', // sender address
      to: 'devjacques28i@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect('/');
      
  });
});


// app.post('/msg', function(req, res) {
//   console.log(req.body)

//   userInfo.create({
//     name: req.body.name,
//     usermsg: req.body.usermsg
//   })


  
// });


// app.post('/forum', function(req, res) {
//   res.render('forum');
 
// });

// app.use('/Ureview', (req, res) => {
// 	var newUser = new User ({
// 		name: req.body.name,
// 		suggestions: req.body.suggestions
// 	    });

//       newUser.save( (err) => { 
// 		if (err) {
// 		    res.type('html').status(500);
// 		    res.send('Error: ' + err);
// 		}
// 		else {
// 		   res.redirect("/")
// 		}
// 	    } ); 

//     });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
