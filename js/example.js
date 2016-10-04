(function(angular, $, _) {

  var resourceUrl = CRM.resourceUrls['org.civicrm.angularex'];
  var example = angular.module('example', ['ngRoute', 'crmResource']);

  example.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

      $routeProvider.when('/civicrm-angularJs', {
        templateUrl: '~/example/example.html',
        controller: 'MainCtrl'
      });

      // This is needed (Utils/Rest.php::ajax()) for CiviCRM to treat the request as genuine
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    }
  ]);

  example.controller('MainCtrl', ['$scope', '$http', '$log', '$timeout', function($scope, $http, $log, $timeout) {

    // Main controller

  }]);

  example.controller('DemoCtrl', ['$scope', '$http', '$log', '$timeout', function($scope, $http, $log, $timeout) {

    $scope.loading = false;
    $scope.memberships = [];
    $scope.filters = {
      startDateFrom: null,
      startDateFrom: null
    };

    $scope.getMemberships = function(){

      $log.debug('Fetching memberships..');

      $scope.loading = true;

      CRM.api3('Membership', 'get', {
        "sequential": 1,
        "start_date": { 
          ">=":$scope.filters.startDateFrom,
          "<=":$scope.filters.startDateTo
        }
      }).done(function(result) {
        // do something
        $log.debug('Found ' + result.count + ' memberships:');
        $log.debug(result.values);
        $timeout(function(){
          $scope.memberships = result.values;
        } ,500);

        $scope.loading = false;
      });
      
    };

    $scope.getMemberships();

  }]);

})(angular, CRM.$, CRM._);