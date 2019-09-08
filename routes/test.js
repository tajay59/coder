var express = require('express');
var router = express.Router();

// Create and update variables to keep track of all clients connected to Mosquitto Broker
var all_who_is_connected = []; 
// store list of all who is connected 
var num_of_current_connections = "";

var mqtt = require('mqtt')
var client  = mqtt.connect('http://localhost:1883')
 
client.on('connect', function () {
    client.subscribe({'#':{qos:0},'$SYS/broker/clients/connected':{qos:0},'$SYS/broker/log/M/subscribe':{qos:0},'$SYS/broker/log/N':{qos:0}}, function (err,granted) {

    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {

    
    // message is Buffer
    var mssg = message.toString();
    if(topic === "$SYS/broker/log/M/subscribe"){ clientsSubscribedTo(mssg);}else if(topic === "$SYS/broker/log/N"){ new_connections(mssg);}else if(topic === "$SYS/broker/clients/connected"){ updateNumOfConnectedClients(mssg);}
    
    
   
    
    });



function new_connections(mssg){
  var array = mssg.split(" ");
//   //console.log("array inside new-connections ");
//   //console.log(array);
  if(array[2] === "client" && array[6] === "as"){
    if(!all_who_is_connected.includes(array[7])){
      all_who_is_connected.push(array[7]);
    } } 
  
  if(array[1] === "Socket" && array[6] === "disconnecting."  ){
    if(all_who_is_connected.includes(array[5])){
      var index = all_who_is_connected.indexOf(array[5]);
      all_who_is_connected.splice(index,1); // Delete item from array
    } } 
        //console.log("array[1] is "+array[1]+" and array[3] is "+array[3]);
    if( array[1] === "Client" && array[6] === "disconnecting." ||  array[1] === "Client" && array[3] === "disconnected." ){
        //console.log("made it one");
        if(all_who_is_connected.includes(array[2])){
            //console.log("found item. Ready to delete ")
        var index = all_who_is_connected.indexOf(array[2]);
        //console.log("item is located at "+index);
        all_who_is_connected.splice(index,1); // Delete item from array
        //console.log("array after deletion is");
        //console.log(all_who_is_connected);
      } } 
  
  
  }

  


function clientsSubscribedTo(mssg){
  var array = mssg.split(" ");
  //console.log("array inside clientsSubscribedTo ");
  //console.log(array);
}
function updateNumOfConnectedClients(mssg){
  num_of_current_connections = mssg;
}

function runit(){
  return num_of_current_connections;
}


/* GET home page. */
router.get('/tt', function(req, res, next) {
    //console.log("got request from webpage "+req.body);
    
    res.send(all_who_is_connected);
});

module.exports = router;
