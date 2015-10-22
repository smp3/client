'use strict';


var Smp3Controllers = angular.module('Smp3Controllers', [
    'angular-storage'

]);

Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store',
    function ($scope, $http, store) {
//         $http.defaults.headers.common = {Accept: "application/json, text/plain, */*"};
//         $http.defaults.headers.post = {"Content-Type": "text/plain"};
//         $http.defaults.useXDomain = true;

        $scope.login = function (user) {
            console.log('login', user);
            $http.post('http://localhost:8000/api/login_check', user).then(function (response) {
                console.log(response.data);
                store.set('jwt', response.data.token);
            });
        };
    }]);

Smp3Controllers.controller('Smp3MainCtrl', ['$scope', '$http', 'ngAudio', 'store',
    function ($scope, $http, ngAudio, store) {
        $scope.discover = function () {
            $http.get('http://localhost:8000/api/discover').success(function (data) {
                     $scope.getLibrary();
            });
        };

        $scope.getLibrary = function () {
            $http.get('http://localhost:8000/api/library').success(function (data) {
                $scope.library = data;
            });
        };
        
        $scope.play = function (file) {
            console.log(file);
            var token = store.get('jwt');
            console.log('Token', token);
            $scope.sound = ngAudio.load('/api/'+file.id+'/stream.json?token='+token);
            $scope.sound.play();
        };
        
        $scope.getLibrary();

    }]);