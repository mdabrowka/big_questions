var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing Questions into DynamoDB. Please wait.");
var subscribers = JSON.parse(fs.readFileSync('subscriberData.json', 'utf8'));
subscribers.forEach(function(subscriber) {
  console.log(subscriber)
var params = {
        TableName: "Subscribers",
        Item: {
            "id": subscriber.id,
            "name": subscriber.name,
            "email": subscriber.email
        }
    };
docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add Subscriber", subscriber.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", subscriber.name);
       }
    });
});
