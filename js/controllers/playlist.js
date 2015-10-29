Smp3Controllers.controller('Smp3PlaylistCtrl', ['$scope', '$location', '$http', 'store', 'PlayerService', 'PlaylistService',
    function ($scope, $location, $http, store, player, playlist) {
        playlist.bindScope($scope);

        $scope.getPlaylists = function () {
            console.log('playlists');
            $http.get('/api/playlists').success(function (data) {
                $scope.playlists = data;
            });
        };

        $scope.play = function (index) {
            player.stop();
            playlist.setPointer(index);
            player.play(playlist.getCurrent());
        };

        $scope.delete = function (index) {
            playlist.delete(index);
        };

        $scope.setCurrentPlaylist = function(playlist) {
            $scope.queue = playlist;
            console.log('Current playlist', playlist);
        };

        $scope.getPlaylists();

    }]);
