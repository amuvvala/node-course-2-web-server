const express = require('express');

const hbs = require('hbs');
var app = express();

const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logmsg = ` current time is : ${now} ${req.method} ${req.url}`;

  console.log(`I am inside first app.use ${logmsg}`);
  fs.appendFile('server.log', logmsg + '\n', (err) => {
    console.log(`failed to update server.log in first app.use ${err}\n`);
  });
  next();
});

//site is under maintenance part
app.use((req, res) => {
  var now = new Date().toString();
  var logmsg = `current time is : ${now} ${req.method} ${req.url}`;

  console.log(`I am inside second app.use ${logmsg}`);
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return '2019';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(text);
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log("server running on port:3000");
});

// app.get('/', (req, res) => {
//   res.send({
//     name:'Andrew',
//     likes : [
//       'Biking',
//       'Cities'
//     ]
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>');
// });
//
// app.get('/bad', (req, res) => {
//   // res.send('<h1>Hello Express</h1>');
//   res.send({
//     errorMessage:'Unable to handle request',
//   });
// });
//
// app.listen(3000, () => {
//   console.log("server running on port:3000");
// });
