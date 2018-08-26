var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var transporter = require('./services/emailService');
const emailModule = require('./services/emailModule');
const sendMessage = require('./services/emailService');
var AWS = require("aws-sdk");
var app = express();
app.listen(3000, () => console.log('Big Questions of our time listening on port 3000!'))
AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/get-questions', function (req, res) {
var params = {
    TableName: "Questions",
    ProjectionExpression: "#question",
    ExpressionAttributeNames: {
        "#question": "question",
    }
};
console.log("Scanning Questions table.");
docClient.scan(params, onScan);
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        res.send(data)
        // print all the Questions
        console.log("Scan succeeded.");
        data.Items.forEach(function(question) {
           console.log(question.question)
        });
if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
  }
})

var emails = ['first email'];

app.post('/api/subscribe', function(req, res) {
  console.log(req.body);
  var subscriber = req.body;
  emails.push(subscriber);
    var params = {
            TableName: "Subscribers",
            Item: {
                "id": emails.length + 1,
                "name": subscriber.name,
                "email": subscriber.email
            }
        };
        console.log('logging params', params);
        docClient.put(params, function(err, data) {
               if (err) {
                   console.error("Unable to add Subscriber", subscriber.name, ". Error JSON:", JSON.stringify(err, null, 2));
               } else {
                   console.log("PutItem succeeded:", subscriber.name);
                   sendMessage(emailModule.adminEmail);
               }
            });
})

module.exports = app;
