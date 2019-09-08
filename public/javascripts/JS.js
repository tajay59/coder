var app = angular.module('myApp', []);
var blockOneData = "";
var blockTwoData = "";


app.controller('dlinks', function($scope) {
    
  
  $scope.sending = function(){
    send_message($scope.pub_data,$scope.send_msg);
   // console.log("sending "+$scope.pub_data+" "+$scope.send_msg)
  }
  $scope.options = {
    langs: [
      {label: 'Physics A', link: ''},
      {label: 'Physics B', link: ''},
      {label: 'Physics C', link: ''},
      {label: 'Seminar Room', link: ''},
      {label: 'PhysicsA', link: ''},
      {label: 'PhysicsB', link: ''},
      {label: 'PhysicsC', link: ''},
      {label: 'SeminarRoom', link: ''}
      
      
    ],
    
  };
});

app.controller('topicList', function($scope) {
  $scope.sub = function() {
   
    blockOneData = $scope.MyData;
    clear();
    sub_topics($scope.MyData);
    block[0] = $scope.MyData;
    
  }
  
  $scope.options = {
    topics: [
      {label: 'Physics A', link: ''},
      {label: 'Physics B', link: ''},
      {label: 'Physics C', link: ''},
      {label: 'Seminar Room', link: ''},
      
      
      
    ],
    
  };
});

app.controller('topiccList', function($scope) {
    
  $scope.sub1 = function() {
    
    blockTwoData = $scope.MyData1;
    clear1();
    sub_topics($scope.MyData1);
    block[1] = $scope.MyData1;
   
  }
  $scope.options = {
    topicc: [
      {label: 'Physics A', link: ''},
      {label: 'Physics B', link: ''},
      {label: 'Physics C', link: ''},
      {label: 'Seminar Room', link: ''},
      
      
      
    ],
    
  };
});


app.controller('block_display', function($scope, $http, $interval) {
  
  
   
 
  
  $scope.sub_topic_block = "No Status Update Yet";
  $interval(function() {
    
    
    $http({
      method : "GET",
        url : "/tt"
    }).then(function mySuccess(response) {
      //$scope.sub_topic_block = response.data;
      //console.log("Received from tt " + response.data[3]+ " currently sub to block one is "+ blockOneData );
      var ans = blockOneData.split(' ').join('');
      var ans1 = ans+"_ESP8266";
      //console.log("ans1 is "+ans1 );
      if(response.data.includes(ans1)){$scope.sub_topic_block = blockOneData+ " Sensor is ONLINE"  } else{ $scope.sub_topic_block = blockOneData+ " Sensor is OFFLINE";}
    }, function myError(response) {
      $scope.sub_topic_block = response.statusText;
      //console.log("Received error from tt" + response.statusText )
    });

  }, 1000);
});

app.controller('block1_display', function($scope, $http, $interval) {

  $scope.sub_topic_block1 = "No Status Update Yet";
  $interval(function() {
    $http({
      method : "GET",
        url : "/tt"
    }).then(function mySuccess(response) {
      //$scope.sub_topic_block = response.data;
      //console.log("Received from tt " + response.data[3]+ " currently sub to block one is "+ blockTwoData );
      var ans = blockTwoData.split(' ').join('');
      var ans1 = ans+"_ESP8266";
      //console.log("ans1 is "+ans1 );
      if(response.data.includes(ans1)){$scope.sub_topic_block1 = blockTwoData+ " Sensor is ONLINE"  } else{ $scope.sub_topic_block1 = blockTwoData+ " Sensor is OFFLINE";}
    }, function myError(response) {
      $scope.sub_topic_block1 = response.statusText;
      //console.log("Received error from tt" + response.statusText )
    });

  }, 1000);
});

