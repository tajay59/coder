

	function onConnectionLost(){
        console.log("connection lost");
        document.getElementById("status").innerHTML = "Connection Lost";
        document.getElementById("status_messages").innerHTML ="Connection Lost";
        connected_flag=0;
        }
    
        function onFailure(message) {
            console.log("Failed");
            document.getElementById("status_messages").innerHTML = "Connection Failed- Retrying";
            setTimeout(MQTTconnect, reconnectTimeout);
                    }
                    
    
        function onMessageArrived(r_message){
            out_msg="Message received "+r_message.payloadString;
            out_msg=out_msg+"      Topic "+r_message.destinationName +"<br/>";
            out_msg="<b>"+out_msg+"</b>";
            //console.log(out_msg+row);
            try{
                document.getElementById("out_messages").innerHTML+=out_msg;
            }
            catch(err){
            document.getElementById("out_messages").innerHTML=err.message;
            }
        
            if (row==50){
                row=1;
                document.getElementById("out_messages").innerHTML=out_msg;
                }
            else
                row+=1;
                
            mcount+=1;
            console.log(mcount+"  "+row);
            }
            
        function onConnected(recon,url){
        console.log(" in onConnected " +reconn);
        }
    
    
        function onConnect() {
          // Once a connection has been made, make a subscription and send a message.
        document.getElementById("status_messages").innerHTML ="Connected to "+host +"on port "+port;
        connected_flag=1;
        document.getElementById("status").innerHTML = "Connected";
        console.log("on Connect "+connected_flag);
    
            }
            
          function disconnect()
          {
            if (connected_flag==1)
                mqtt.disconnect();
                
            }
            
    
        function MQTTconnect() {
        // var clean_sessions = document.forms["connform"]["clean_sessions"].value;
        // var user_name = document.forms["connform"]["username"].value;
        // console.log("clean = "+clean_sessions);
        // var password = document.forms["connform"]["password"].value;
        
        // if (clean_sessions = document.forms["connform"]["clean_sessions"].checked)
        // 	clean_sessions = true
        // else
        // 	clean_sessions = false
    
        // document.getElementById("status_messages").innerHTML ="";
        // var s = document.forms["connform"]["server"].value;
        // var p = document.forms["connform"]["port"].value;
        // if (p!="")
        // {
        // 	port=parseInt(p);
        // 	}
        // if (s!="")
        // {
        // 	//host=s;
        
        // 	console.log("host");
        // 	}
    
        // console.log("connecting to "+ host +" "+ port +"clean session="+clean_sessions);
        // console.log("user "+user_name);
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
        
        document.getElementById("status_messages").innerHTML='connecting';
        mqtt = new Paho.MQTT.Client(location.hostname,9002,makeid(10)); //location.hostname  "clientjsaaa"
        
    
        var options = {
            timeout: 3,
            cleanSession: false,
            onSuccess: onConnect,
            onFailure: onFailure,
          
             };
             
        //  if (user_name !="")
        // 		 options.userName=document.forms["connform"]["username"].value;
                 
        // if (password !="")
        // 		options.password=document.forms["connform"]["password"].value;
        
            mqtt.onConnectionLost = onConnectionLost;
            mqtt.onMessageArrived = onMessageArrived;
            mqtt.onConnected = onConnected;
    
        mqtt.connect(options);
        return false;
      
     
        }
    
       
    
        function sub_topics(tpic){
            document.getElementById("status_messages").innerHTML ="";
            if (connected_flag==0){
            out_msg="<b>Not Connected so can't subscribe</b>"
            console.log(out_msg);
            document.getElementById("status_messages").innerHTML = out_msg;
            return false;
            }
        var stopic= tpic;
        console.log("here");
        var sqos = 0;
        if (sqos>2)
            sqos=0;
        console.log("Subscribing to topic ="+stopic +" QOS " +sqos);
        document.getElementById("status_messages").innerHTML = "Subscribing to topic ="+stopic;
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
            out_msg="<b>Not Connected so can't send</b>"
            console.log(out_msg);
            document.getElementById("status_messages").innerHTML = out_msg;
            return false;
            }
            var pqos=0;
            if (pqos>2)
                pqos=0;
            var msg = mssg;
            
            console.log(msg);
            document.getElementById("status_messages").innerHTML="Sending message  "+msg;
    
            var topic = mssg_topic;
            
            //var retain_message = document.forms["smessage"]["retain"].value;
            // if (document.forms["smessage"]["retain"].checked)
            //     retain_flag=true;
            // else
            //     retain_flag=false;

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
        // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        

//  var co2 = [];
//  var temp = [];

   
	function onConnectionLost(){
        console.log("connection lost");
        document.getElementById("status").innerHTML = "Connection Lost";
        document.getElementById("status_messages").innerHTML ="Connection Lost";
        connected_flag=0;
        }
    
        function onFailure(message) {
            console.log("Failed");
            document.getElementById("status_messages").innerHTML = "Connection Failed- Retrying";
            setTimeout(MQTTconnect, reconnectTimeout);
                    }
                    
    
        function onMessageArrived(r_message){

            
            var array = r_message.payloadString.split(",");
            out_msg= array[0]+ "<br/>"+array[1]+ "<br/>"+array[2]+ "<br/>"+array[3]
            console.log(array);


            // co2.push(array[1]);
            // temp.push(array[2]);


            updateTable(array);
            // console.log("tempValue is"+ tempValue);
            // try{
            //     document.getElementById("out_messages").innerHTML+=out_msg;
            // }
            // catch(err){
            // document.getElementById("out_messages").innerHTML=err.message;
            // }
        
            // if (row==50){
            //     row=1;
            //     document.getElementById("out_messages").innerHTML=out_msg;
            //     }
            // else
            //     row+=1;
                
            // mcount+=1;
            // console.log(mcount+"  "+row);
            }
            
        function onConnected(recon,url){
        console.log(" in onConnected " +reconn);
        }
        function updateTable(mssg) {
            var table = document.getElementById("onet");
            var row = table.insertRow(-1);
            
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = mssg[0];
            cell2.innerHTML = mssg[1];
            cell3.innerHTML = mssg[2];
            cell4.innerHTML = mssg[3];
          }
    
    
        function onConnect() {
          // Once a connection has been made, make a subscription and send a message.
        document.getElementById("status_messages").innerHTML ="Connected to "+host +"on port "+port;
        connected_flag=1;
        document.getElementById("status").innerHTML = "Connected";
        console.log("on Connect "+connected_flag);
    
            }
            
          function disconnect()
          {
            if (connected_flag==1)
                mqtt.disconnect();
                
            }
            
    
        function MQTTconnect() {
        // var clean_sessions = document.forms["connform"]["clean_sessions"].value;
        // var user_name = document.forms["connform"]["username"].value;
        // console.log("clean = "+clean_sessions);
        // var password = document.forms["connform"]["password"].value;
        
        // if (clean_sessions = document.forms["connform"]["clean_sessions"].checked)
        // 	clean_sessions = true
        // else
        // 	clean_sessions = false
    
        // document.getElementById("status_messages").innerHTML ="";
        // var s = document.forms["connform"]["server"].value;
        // var p = document.forms["connform"]["port"].value;
        // if (p!="")
        // {
        // 	port=parseInt(p);
        // 	}
        // if (s!="")
        // {
        // 	//host=s;
        // 	console.log("host");
        // 	}
    
        // console.log("connecting to "+ host +" "+ port +"clean session="+clean_sessions);
        // console.log("user "+user_name);
        
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnophbkbbf468464644dxyrwryedrjqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }


         
        document.getElementById("status_messages").innerHTML='connecting';
        mqtt = new Paho.MQTT.Client(location.hostname,9002,makeid(Math.random()*20)); //location.hostname    "clientjsaaa" 
        
    
        var options = {
            timeout: 3,
            cleanSession: true,
            onSuccess: onConnect,
            onFailure: onFailure,
          
             };
             
        //  if (user_name !="")
        // 		 options.userName=document.forms["connform"]["username"].value;
                 
        // if (password !="")
        // 		options.password=document.forms["connform"]["password"].value;
        
            mqtt.onConnectionLost = onConnectionLost;
            mqtt.onMessageArrived = onMessageArrived;
            mqtt.onConnected = onConnected;
    
        mqtt.connect(options);
        return false;
      
     
        }
    
       
    
        function sub_topics(tpic){
            document.getElementById("status_messages").innerHTML ="";
            if (connected_flag==0){
            out_msg="<b>Not Connected so can't subscribe</b>"
            console.log(out_msg);
            document.getElementById("status_messages").innerHTML = out_msg;
            return false;
            }
        var stopic= tpic;
        console.log("here");
        var sqos = 0;
        if (sqos>2)
            sqos=0;
        console.log("Subscribing to topic ="+stopic +" QOS " +sqos);
        document.getElementById("status_messages").innerHTML = "Subscribing to topic ="+stopic;
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
            out_msg="<b>Not Connected so can't send</b>"
            console.log(out_msg);
            document.getElementById("status_messages").innerHTML = out_msg;
            return false;
            }
            var pqos=0;
            if (pqos>2)
                pqos=0;
            var msg = mssg;
            
            console.log(msg);
            document.getElementById("status_messages").innerHTML="Sending message  "+msg;
    
            var topic = mssg_topic;
            
            //var retain_message = document.forms["smessage"]["retain"].value;
            // if (document.forms["smessage"]["retain"].checked)
            //     retain_flag=true;
            // else
            //     retain_flag=false;

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

        