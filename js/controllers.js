'use strict';


var Smp3Controllers = angular.module('Smp3Controllers', [
    'angular-storage'

]);

Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store', '$location',
    function ($scope, $http, store, $location) {
        $scope.login = function (user) {
            console.log('login', user);
            $http.post('/api/login_check', user).then(function (response) {
                console.log('Repsonse', response);
                if (response.status = 200 && response.data.token) {
                    store.set('jwt', response.data.token);
                    $location.path('/');
                }
            }, function (response) {
                console.log(response);
                if (response.status == 401) {
                    $scope.error = response.data;
                } else {
                    $scope.error = 'Unexpected error, code: ' + response.status
                }

            });
        };
    }]);

Smp3Controllers.controller('Smp3MainCtrl', ['$scope', '$location', '$http', 'ngAudio', 'store', 'PlayerService',
    'PlaylistService',
    function ($scope, $location, $http, ngAudio, store, player, playlist) {

        var config = store.get('config');

        if (!config) {
            $location.path('/config');
        }

        $scope.discover = function () {
            $http.get('/api/discover').success(function (data) {
                $scope.getLibrary();
            });
        };

        $scope.logout = function () {
            console.log('logout');
            store.set('jwt', '');
            $location.path('/login');
        };

        $scope.getLibrary = function () {
            $http.get('/api/library').success(function (data) {
                $scope.library = data;
            });
        };

        $scope.play = function (file) {
            player.play(file);
        };

        $scope.enqueue = function (file) {
            playlist.enqueue(file);
        };

        $scope.getLibrary();

    }]);


Smp3Controllers.controller('Smp3PlayerCtrl', ['$scope', '$http', 'ngAudio', 'store', 'PlayerService', 'PlaylistService',
    function ($scope, $http, ngAudio, store, player, playlist) {
        $scope.current_file = null;
        $scope.play = function () {
            if (!$scope.current_file && !playlist.empty()) {
                player.play(playlist.getCurrent());
            } else {
                player.playCurrent();
            }
        };

        $scope.pause = function () {
            player.pause();
        };

        $scope.stop = function () {
            player.stop();
        };

        player.bindScope($scope);

    }]);

Smp3Controllers.controller('Smp3ConfigCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        $scope.saveConfig = function (config) {
            store.set('config', config);
            $location.path('/');
        };

    }]);

Smp3Controllers.controller('Smp3PlaylistCtrl', ['$scope', '$location', '$http', 'store', 'PlayerService', 'PlaylistService',
    function ($scope, $location, $http, store, player, playlist) {
        playlist.bindScope($scope);
        $scope.play = function (index) {
            player.stop();
            playlist.setPointer(index);
            player.play(playlist.getCurrent());
        };

        $scope.delete = function (index) {
            playlist.delete(index);
        };

    }]);


Smp3Controllers.controller('Smp3MenuCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        

    }]);