'use strict';


var Smp3Controllers = angular.module('Smp3Controllers', [
    'angular-storage'
    
]);

Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store',
    function ($scope, $http, store) {
        $http({
           url: '/api/login_check',
           method: 'POST',
           data: {"_username": "maciek", "_password": "test"}
        }).then(function(response) {
          console.log(response);
          store.set('jwt', response.data.token);
        });
//        $http.get('/api/login_check').success(function (data) {
//           
//        });
    }]);


Smp3Controllers.controller('Smp3DiscoverCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/api/discover').success(function (data) {
           
        });
    }]);
