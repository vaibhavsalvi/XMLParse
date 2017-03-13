var fs = require("fs");
var xmlParser = require("xml2js");
var asiafile = "0";
var usfile = "0";
var asiaprodfile="0";
var usprodfile="0";
var express =require("express");
var app=express();

app.get('/compare/Asia', function (req, res) {
   if (asiafile==asiaprodfile)
      res.send("Asia files match");  
})

app.get('/compare/US', function (req, res) {
   if (usfile==usprodfile)
      res.send("US files match");  
})

app.get('/Operations', function (req, res) {
   if (usfile==usprodfile)
      res.send("US files match");  
})

app.get('/Global', function (req, res) {
   if (usfile==usprodfile)
      res.send("US files match");  
})

app.get('/Risk', function (req, res) {
   if (usfile==usprodfile)
      res.send("US files match");  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// Asynchronous read
fs.readFile('asia.xml', function (err, data) {
    if (err) {
        return console.error(err);
    }
    //console.log("Asynchronous read: " + data.toString());
    asiafile = data.toString();
});

// Asynchronous read
fs.readFile('Prod/asia.xml', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asia Prod: " + data.toString());
    asiaprodfile = data.toString();
});

// Asynchronous read
fs.readFile('us.xml', function (err, data) {
    if (err) {
        return console.error(err);
    }
    //console.log("Asynchronous read: " + data.toString());
    usfile = data.toString();    
    });

    // Asynchronous read
fs.readFile('Prod/us.xml', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("US prod: " + data.toString());
    usprodfile = data.toString();
});

