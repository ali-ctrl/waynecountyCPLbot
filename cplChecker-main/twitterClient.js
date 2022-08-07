const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({ 
    appKey: "REPLACE",
    appSecret: "REPLACE",
    accessToken: "REPLACE",
    accessSecret: "REPLACE" });


const rwClient = client.readWrite

module.exports = rwClient