var builder = require('botbuilder');
var restify = require("restify");

//Setup resitfy server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log("%s listen to %s", server.name, server.url);
})

//For connecting to bot framework
var connector = new builder.ChatConnector({
    // You don't need appId and passoword when running on emulator
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, function(session){
    session.send("you said: %s", session.message.text);
})

bot.dialog('greetings', [
    function(session){
        builder.Prompt.text(session, "Hello, what is your name?");
    },
    function(session, results){
        session.endDialog('Hello ${results.respone}');
    }
]);