angular
  .module('example')
  .controller("LoginController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = null;
    //$scope.users = null;
    $scope.loginButton = "Login";

    Usertable.findAll().then( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    $scope.clickLogin = function() {
      var flag = false;
      $scope.username = document.getElementById('login-username').value;
      $scope.password = document.getElementById('login-password').value;

      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].userName == $scope.username && $scope.userdatas[i].userPassword == $scope.password){           
          flag = true;
          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
          break;
        }          
      }

      if (flag == false){
        alert("Invalid username or password!");
      }
    };
    
    $scope.signupButton = "Sign Up";
    $scope.clickSignup = function() {
      if ($scope.signupButton == "Sign Up"){
        var flag = false;
        $scope.userdata['firstName'] = document.getElementById('signup-firstname').value;
        $scope.userdata['lastName'] = document.getElementById('signup-lastname').value;
        $scope.userdata['userName'] = document.getElementById('signup-username').value;
        $scope.userdata['userPassword'] = document.getElementById('signup-password').value;
        $scope.userdata['phoneNumber'] = document.getElementById('signup-phonenumber').value;
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.userdata['userName']  ==  $scope.userdatas[i].userName ){           
            flag = true;
            break;
          }          
        }
        if ($scope.userdata['firstName'] == "" || $scope.userdata['lastName'] == "" || $scope.userdata['userName'] == "" || $scope.userdata['userPassword'] == "" || $scope.userdata['phoneNumber'] == ""){
          alert("Please fill in all blank areas!");
        } else {
          if (flag == false){
            newuserdata = new Usertable($scope.userdata);
            newuserdata.save();
            $scope.signupButton = "Login";
            alert("Successfully sign up!");
          }
          else {
            alert("Same username existed!! Input a new one:)");
          }
        }
      }
      else if ($scope.signupButton == "Login"){
        supersonic.ui.initialView.dismiss();
      }
    };




    /*
    var usert = supersonic.data.model('userTable');
    var query = {"lastName": "Diaz"};
    usert.findAll({query: JSON.stringify(query)}).then(function(users){
      $scope.$apply( function () {
        $scope.users = users;
        supersonic.logger.log(users);
      });
    });
    */

  });