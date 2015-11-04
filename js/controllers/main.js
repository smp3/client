Smp3Controllers.controller('Smp3MainCtrl', ['$scope', '$location', '$http', 'ngAudio', 'store', 'PlayerService',
    'PlaylistService',
    function ($scope, $location, $http, ngAudio, store, player, playlist) {

        var config = store.get('config');
        
        $scope.mode = 'library';

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
