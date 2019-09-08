var express = require('express');
var router = express.Router();
var path = require('path');
router.use(express.static(path.join(__dirname, '/')));

function TopicS(topic){    ///    Topics Object
  this.CO2 = new Array();
  this.TEMPERATURE = new Array();
  this.HUMIDITY = new Array();
  this.TIME = new Array();
  this.topic =  topic;
  this.updateCO2 = function(value){
    this.CO2.push(value);
    if(this.CO2.length > 100){
      this.CO2.shift();
    }
  }
  this.updateTEMPERATURE = function(value){
    this.TEMPERATURE.push(value);
    if(this.TEMPERATURE.length > 100){
      this.TEMPERATURE.shift();
    }
  }
  this.updateHUMIDITY = function(value){
    this.HUMIDITY.push(value);
    if(this.HUMIDITY.length > 100){
      this.HUMIDITY.shift();
    }
  }
  this.updateTIME = function(value){
    this.TIME.push(value);
    if(this.TIME.length > 100){
      this.TIME.shift();
    }
  }
  
}


var PhysicsA = new TopicS("Physics A");
var PhysicsB = new TopicS("Physics B");
var PhysicsC = new TopicS("Physics C");
var SeminarRoom = new TopicS("Seminar Room");

var mqtt = require('mqtt')
var client  = mqtt.connect('http://localhost:1883')
 
client.on('connect', function () {
    client.subscribe({'/uwi/sensors/#':{qos:0}}, function (err,granted) {

    if (!err) {
      //client.publish('presence', 'Hello mqtt')
      console.log("CONNECTED TO CSV MQTT");
    }
    })
})
 
client.on('message', function (topic, message) {
	console.log("MESSAGE RECEIVED");
    
    // message is Buffer
    var mssg = message.toString();
    
    var array = mssg.split(",");
    var topic = topic.split("/");
    console.log(topic[3]);
    if (topic[3] === "Physics C"){
      updateAll(PhysicsC,array);
    }else if (topic[3] === "Physics B"){
      console.log("calling update for Physics B")
      updateAll(PhysicsB,array);
    }else if (topic[3] === "Physics A"){
      updateAll(PhysicsA,array);
    }else if (topic[3] === "Seminar Room"){
      updateAll(SeminarRoom,array);
    }
    //if(topic === "$SYS/broker/log/M/subscribe"){ clientsSubscribedTo(mssg);}else if(topic === "$SYS/broker/log/N"){ new_connections(mssg);}else if(topic === "$SYS/broker/clients/connected"){ updateNumOfConnectedClients(mssg);}
    
    
   //console.log(PhysicsC.CO2);
    
    });

	function updateAll(msg,array){
    //console.log("The array contains  "+array);
	  msg.updateCO2(array[1]);
      msg.updateTEMPERATURE(array[2]);
      msg.updateHUMIDITY(array[3]);
	  var  currentTime = new Date().toLocaleString("en-US", {timeZone: "America/Cancun"});
	  cTime = currentTime.split(",");
	  msg.updateTIME(cTime[1]);
		
	}

 
/* GET home page. */
router.get('/readCSV', function(req, res, next) {
	//console.log("The selected topic is "+req.query.topic);
  var topic = req.query.topic;
  if (topic === "Physics C"){
    
      res.send(PhysicsC);
    }else if (topic === "Physics B"){
      //console.log(PhysicsB);
      res.send(PhysicsB);
    }else if (topic === "Physics A"){
      res.send(PhysicsA);
    }else if (topic === "Seminar Room"){
      res.send(SeminarRoom);
    }
  //res.sendFile('Physics C.csv', { root: __dirname });
  //res.json({Lastname:"Edwards\n", Firstname:"Tajay"})
  //res.render('index', { title: 'Express' });
});

module.exports = router;
