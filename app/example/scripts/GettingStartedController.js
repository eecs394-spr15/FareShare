angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;
    var filterDept;
    var filterDest;

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    //google geolocation for departure
    $scope.departClick = function() {
      $scope.departureInput = document.getElementById("departureLocation");
      var autocompleteDep = new google.maps.places.Autocomplete($scope.departureInput); 
      google.maps.event.addListener(autocompleteDep, 'place_changed', function() {
            $scope.departureInput=autocompleteDep.getPlace().geometry.location;
            filterDept = new google.maps.LatLng($scope.departureInput.lat(), $scope.departureInput.lng());
      });
    };

    //google geolocation for destination
    $scope.destClick = function() {
      $scope.destInput = document.getElementById("destination");
      var autocompleteDest = new google.maps.places.Autocomplete($scope.destInput); 
      google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
            $scope.destInput=autocompleteDest.getPlace().geometry.location;
            filterDest = new google.maps.LatLng($scope.destInput.lat(), $scope.destInput.lng());
      });
    };

    $scope.myfilter = function(element){
      var DateString = "";
      var timeBool = true;
      var timeInt1 = "";
      var parsedint1 = 0;
      var parsedint2 = 0;
      var withinDept = true;
      var withinDest = true;
      
      if ($scope.departDate)
      {
        DateString = String($scope.departDate.getMonth() + 1) + "/"
          + String($scope.departDate.getDate()) + "/" 
          + String($scope.departDate.getFullYear());
      }
      if ($scope.departTime)
      {
        timeINT1 = element['departTime'].split(":");
        parsedint1 = (60* parseInt(timeINT1[0])) + parseInt(timeINT1[1]);
        parsedint2 = 60 * $scope.departTime.getHours() + $scope.departTime.getMinutes();
        if (Math.abs(parsedint1 - parsedint2) > 60.0)
        {
          timeBool = false;
        }
      }

      var dateBool = (element['departDate'] == DateString);
      dateBool = dateBool || (!$scope.departDate);

      dbDept = new google.maps.LatLng(element['deptObj'].k, element['deptObj'].D);
      dbDest = new google.maps.LatLng(element['destObj'].k, element['destObj'].D);
      if (filterDept!=undefined) {
        //computeDistance returns distance in meters, divide by 1609 to change to miles
        $scope.distanceDept = google.maps.geometry.spherical.computeDistanceBetween(filterDept, dbDept)/1609.34;
        //if departure location and filter is within x miles
        if ($scope.distanceDept > 5) {
          withinDept = false;
        }
      }
      if (filterDest!=undefined) {
        //computeDistance returns distance in meters, divide by 1609 to change to miles
        $scope.distanceDest = google.maps.geometry.spherical.computeDistanceBetween(filterDest, dbDest)/1609.34;
        //if destination location and filter is within x miles
        if ($scope.distanceDest > 5) {
          withinDest = false;
        }
      }
      
      return (timeBool && dateBool && withinDept && withinDest);
    }; 

    $scope.refreshTaxis = function() {
      location.reload();
    };

    //$scope.query = function(){
    
    //$scope.query.date=String($scope.query.date.getMonth() + 1) + "/"
    //   + String($scope.query.date.getDate()) + "/" 
    //   + String($scope.query.date.getFullYear());
    
    // } 
//    $scope.queryDate={};
//    $scope.filterByDate = function(taxidata){
//        return $scope.queryDate[taxidata.departDate];
//    }
    // $scope.updateSeats = function(taxidata) {
    //   alert(taxidata['destObj'].k);
    // };
  });