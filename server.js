const express = require('express')
const app = express()
var cors = require('cors');
const port = 3000

app.use(cors()); 
let sessionId;
const apiKey = "46953724";
const secret = "b3b152518eea89b4b3ed72c7b8a2668201232a4e";
var OpenTok = require('opentok'),
opentok = new OpenTok(apiKey, secret);
opentok.createSession({mediaMode:"routed"}, function(err, session) {
    if (err) return console.log(err);
    sessionId = session.sessionId;
  });
  
app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let sessionData ={};
  sessionData["apiKey"] = apiKey;
  sessionData["sessionId"]=sessionId;
  sessionData["token"] = opentok.generateToken(sessionId);  
  res.send(sessionData)
})
app.listen(port, () => {
  console.log(`running server at port :${port}`)
})