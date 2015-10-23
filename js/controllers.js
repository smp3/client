'use strict';


var Smp3Controllers = angular.module('Smp3Controllers', [
    'angular-storage'

]);

Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store',
    function ($scope, $http, store) {
        $scope.login = function (user) {
            console.log('login', user);
            $http.post('/api/login_check', user).then(function (response) {
                console.log(response.data);
                store.set('jwt', response.data.token);
            });
        };
    }]);

Smp3Controllers.controller('Smp3MainCtrl', ['$scope', '$location', '$http', 'ngAudio', 'store', 'PlayerService',
    function ($scope, $location, $http, ngAudio, store, player) {


        var config = store.get('config');
         console.log(config);
        if (!config) {
            console.log(config);
            $location.path('/config');
        }

        $scope.discover = function () {
            $http.get('/api/discover').success(function (data) {
                $scope.getLibrary();
            });
        };

        $scope.getLibrary = function () {
            $http.get('/api/library').success(function (data) {
                $scope.library = data;
            });
        };

        $scope.play = function (file) {
            player.play(file);
        };

        $scope.getLibrary();

    }]);


Smp3Controllers.controller('Smp3PlayerCtrl', ['$scope', '$http', 'ngAudio', 'store', 'PlayerService',
    function ($scope, $http, ngAudio, store, player) {
        
        player.bindScope($scope);

    }]);

Smp3Controllers.controller('Smp3ConfigCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        $scope.saveConfig = function (config) {
            store.set('config', config);
            $location.path('/');
        };

    }]);