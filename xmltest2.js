var fs = require("fs");
var xmlParser = require("xml2js");
var asiafile = "0";
var usfile = "0";
var asiaprodfile = "0";
var usprodfile = "0";
var express = require("express");
var app = express();

app.get('/compare/Asia', function (req, res) {
    if (asiafile == asiaprodfile)
        res.send("Asia files match");
})

app.get('/compare/US', function (req, res) {
    if (usfile == usprodfile)
        res.send("US files match");
})

app.get('/Operations/', function (req, res) {
    var operationsFileName = "";
    // Asynchronous read
    fs.readFile('Prod/asia.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data);
        //var reportxml='<reportjob><report>A</report></reportjob>';
        var reportxml=data.toString();
        //console.log('<root>Hello xml2js-parser!</root>');
        var parser = xmlParser.Parser();
        //console.log(parser);
        parser.parseString(reportxml, function (err, data) {
        if (err) {
            return console.error(err);
        }
        
        for (i = 0; i < data.reportjob.report.length; i++) {
            console.log(data.reportjob.report[i]);
            console.log(data.reportjob.report[i].filepath.indexOf('Operations') )
            if (data.reportjob.report[i].filepath.indexOf('Operations')  == 0) {
                console.log('Found');
                operationsFileName =  data.reportjob.report[i];
                res.send(operationsFileName);
            }
        };
        });
    });
    
});

        
    

app.get('/Global', function (req, res) {
    if (asiaprodfile == usprodfile)
        res.send("These are global files");
})

app.get('/Modify', function (req, res) {
     // Asynchronous read
fs.readFile('input1.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
    originalFile = data.toString();
    var parser = xmlParser.Parser();
 console.log(originalFile);
    parser.parseString(originalFile, function (err, data) {
        console.log(data);
        for (i = 0; i < data.reportjob.report.length; i++) {
            console.log(data.reportjob.report[i].reportname);
        }
        
        for (i = 0; i < data.reportjob.report.length; i++) {

            data.reportjob.report[i].reportname = "TempOperations";
        }

        var obj = data;

        var builder = new xmlParser.Builder();
        var xmltext = builder.buildObject(obj);
        fs.writeFile('input1.txt', xmltext, function (err) {
            if (err) {
                return console.error(err);
            }
            res.send('Modified file input1.txt')
        });
    });
});
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
    //console.log("Asia Prod: " + data.toString());
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
    //console.log("US prod: " + data.toString());
    usprodfile = data.toString();
});

