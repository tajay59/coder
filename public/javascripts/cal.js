
 
 
 var block = [];
 
 
   
function onConnectionLost(){
    // //console.log("connection lost");
    
    document.getElementById("status_messages").innerHTML ="<p style = 'color:red'> Connection Lost </p>";
    connected_flag=0;
    }

    function onFailure(message) {
        // //console.log("Failed");
        document.getElementById("status_messages").innerHTML = "<p style = 'color:red'> Connection Failed - Retrying</p>";
        setTimeout(MQTTconnect, reconnectTimeout);
                }
                


    function viewUpdate(array){
        // //console.log(array);
        document.getElementById("oneCO2").innerHTML = array[1];
        document.getElementById("oneTemperature").innerHTML = array[2];
     
        document.getElementById("oneHumidity").innerHTML = array[3];
        // co2.push(array[1]);
        // temp.push(array[2]);
        updateTable(array);

    }
    function viewUpdate1(array){
        // //console.log(array);
        document.getElementById("twoCO2").innerHTML = array[1];
        document.getElementById("twoTemperature").innerHTML = array[2];
        
        document.getElementById("twoHumidity").innerHTML = array[3];
        // co21.push(array[1]);
        // temp1.push(array[2]);
        updateTable1(array);

    }
    function clear(){
        // //console.log('Clearing data from block[0] elements');
        document.getElementById("oneTemperature").innerHTML = '';
        document.getElementById("oneCO2").innerHTML = '';
        document.getElementById("oneHumidity").innerHTML = '';
        co2 = [];
        temp = [];
       

    }

    function clear1(){
        // //console.log('Clearing data from block[1] elements');
        document.getElementById("twoTemperature").innerHTML = '';
        document.getElementById("twoCO2").innerHTML = '';
        document.getElementById("twoHumidity").innerHTML = '';
        co21 = [];
        temp1 = [];
        

    }

    function onMessageArrived(r_message){

        
        var array = r_message.payloadString.split(",");
        
        out_msg= array[0]+ "<br/>"+array[1]+ "<br/>"+array[2]+ "<br/>"+array[3]
        //console.log("array[0] "+ array[0]);
        //console.log("Bloock"+ block);
        var Topic = array[0].split("/");
        //console.log(" topic is  "+Topic[3] );
        if(block.includes(Topic[3]) === true ){
            // find index
            //console.log("value is true")
            var ans = block.indexOf(Topic[3]);
            // //console.log("ans is "+ans)
            // update 
            if(ans === 0){
                viewUpdate(array);
            }
            if(ans === 1){
                viewUpdate1(array);
            }
            
        }

        }
        
    function onConnected(recon,url){
    // //console.log(" in onConnected " +reconn);
    }

    function updateTable(mssg) {
        var table = document.getElementById('oneTable');
        var row = table.insertRow(1);
        var Topic = mssg[0].split("/");
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = Topic[3];
        cell2.innerHTML = mssg[1];
        cell3.innerHTML = mssg[2];
        cell4.innerHTML = mssg[3];
      }
      function updateTable1(mssg) {
        var table = document.getElementById('twoTable');
        var row = table.insertRow(1);
        var Topic = mssg[0].split("/");
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = Topic[3];
        cell2.innerHTML = mssg[1];
        cell3.innerHTML = mssg[2];
        cell4.innerHTML = mssg[3];
      }


    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
    document.getElementById("status_messages").innerHTML ="<p style = 'color:white'>Connected</p>";
    connected_flag=1;}
        
    function disconnect(){
        if (connected_flag==1)
            mqtt.disconnect();            
        }
        

    function MQTTconnect() {

    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnophbkbbf468464644dxyrwryedrjqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }


     
    document.getElementById("status_messages").innerHTML='<p style = "color:white">Connecting</p>';
    mqtt = new Paho.MQTT.Client(location.hostname,9002,makeid(Math.random()*20)); //location.hostname    "clientjsaaa" 
    

    var options = {
        timeout: 3,
        cleanSession: false,
        onSuccess: onConnect,
        onFailure: onFailure,
      
         };
         
    
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        mqtt.onConnected = onConnected;

    mqtt.connect(options);
    setTimeout(function(){ // Resubcribing to previous topics after a connection lost
        var val = block.length;
        //console.log("length of block array is "+val);
        if(val > 0){
            for(i=0;i < val;i++){
                // //console.log("i is "+i)
                sub_topics(block[i]);
            }
        } 
         }, 3000);
   
    return false;
  
 
    }

   

    function sub_topics(tpic){
        document.getElementById("status_messages").innerHTML ="";
        if (connected_flag==0){
        out_msg="<p style = 'color:red'>Not Connected</p>"
        alert("NOT CONNECT, SO CAN'T SUBSCRIBE");
        // //console.log(out_msg);
        document.getElementById("status_messages").innerHTML = out_msg;
        return false;
        }
        var stopic= "/uwi/sensors/"+tpic;
        // //console.log("here");
        var sqos = 0;
        if (sqos>2)
            sqos=0;
        // //console.log("Subscribing to topic ="+stopic +" QOS " +sqos);
        //document.getElementById("status_messages").innerHTML = "<p style = 'color : white'>Subscribing to "+stopic+"</p>";
        var soptions={
            qos:sqos,
            };
        mqtt.subscribe(stopic,soptions);
        return false;
    }



    function send_message(mssg_topic,mssg){
        document.getElementById("status_messages").innerHTML ="";
        document.getElementById("sendMssg").value ="";
        if (connected_flag==0){
            out_msg="<p  style = 'color:red' >Not Connected</p>"
            alert("NOT CONNECT, SO CAN'T SEND");
            // //console.log(out_msg);
            document.getElementById("status_messages").innerHTML = out_msg;
            return false;
        }
        var pqos=0;
        if (pqos>2)
            pqos=0;
        var msg = mssg;
        
        // //console.log(msg);
        document.getElementById("status_messages").innerHTML="Message sent! "+msg;
        setTimeout(function(){ 
            document.getElementById("status_messages").innerHTML= "";
            
             }, 3000);
        var topic = "/uwi/mssgSensors/"+mssg_topic;
        
        message = new Paho.MQTT.Message(msg);

        if (topic=="")
            message.destinationName = "test-topic";
        else
            message.destinationName = topic;

        message.qos=pqos;
        message.retained=false;
        mqtt.send(message);
        

        return false;
    }
