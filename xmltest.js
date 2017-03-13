var fs = require("fs");
var xmlParser = require("xml2js");
var firstFile = "0";
var secondFile = "0";

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    //console.log("Asynchronous read: " + data.toString());
    firstFile = data.toString();
});

// Asynchronous read
fs.readFile('input1.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
    secondFile = data.toString();
    var parser = xmlParser.Parser();
 console.log(parser);
    parser.parseString(secondFile, function (err, data) {
        console.log(data);
        for (i = 0; i < data.reportjob.report.length; i++) {
            console.log(data.reportjob.report[i].reportname);
        }
        if (firstFile == secondFile) {
            console.log("Eureka");
        }
        else {
            console.log("Mismatch");
        }
        for (i = 0; i < data.reportjob.report.length; i++) {

            data.reportjob.report[i].reportname = "Changed";
        }

        var obj = data;

        var builder = new xmlParser.Builder();
        var xmltext = builder.buildObject(obj);
        fs.writeFile('input1.txt', xmltext, function (err) {
            if (err) {
                return console.error(err);
            }
            if (firstFile == secondFile) {
                console.log("Eureka");
            }
            else {
                console.log("Mismatch");
            }
        });
    });
});

