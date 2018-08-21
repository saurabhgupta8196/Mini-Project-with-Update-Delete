//importing libraries
var http = require('http');
var express = require('express');
var data = require('./data.json')
var parser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var exp = express();
var courses = require('./courses.json');

//Declaring Vaiables

var appendData;
var _url = '/get';
var _url2 = '/add';
var _url3 = '/getCourses';
var _url4 = '/update';
var _url5 = '/delete/:dname';
exp.use(cors());
exp.route(_url, cors()).get((req, res) => {
    console.log("Get Url invoked for courses");
    res.send(data);
    res.end();
});

exp.route(_url3, cors()).get((req, res) => {
    console.log("Get Url invoked for course.json");
    res.send(courses);
    res.end();
});

exp.use(parser.json());
exp.route(_url2, cors()).post((req, res) => {
    console.log("Post Invoked");
    data.push(req.body)
    console.log(data)
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.status(201).send(data);
});

exp.route(_url4, cors()).put((req, res) => {
    console.log("Update Url invoked")
    for (var  prod  of  data) {
        if (prod.courseName == req.body.updatecname) {
           
            prod.courseName  =  req.body.updatecname;
            prod.courseDuration  =  req.body.updatedname;
            
        }
        fs.writeFileSync('data.json', JSON.stringify(data));
    }
    res.send(data);
});

exp.route(_url5, cors()).delete((req, res) => {
    console.log("Delete Url invoked");
    for (var  e  in  data) {
        if (data[e].courseName == req.params.dname) {
            data.splice(e, 1);
            console.log("Inside Delete");
        }
        fs.writeFileSync('data.json', JSON.stringify(data));
    }
    res.send(data);
});

exp.listen(4004, () => console.log("Running Node"));
