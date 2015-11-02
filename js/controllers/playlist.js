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

        $scope.newPlaylist = function () {
            console.log('newPlaylist');
            var new_playlist = {
                title: 'title',
                playlist_files: []
            };
            $scope.playlists.push(new_playlist);
            //$scope.setCurrentPlaylist(new_playlist);

        };

        $scope.setCurrentPlaylist = function (current_playlist) {
            playlist.setCurrent(current_playlist);
            console.log('Current playlist', current_playlist);
        };

        $scope.savePlaylist = function (playlist) {
            console.log('savePlaylist', playlist);
            if (playlist.id) {
                console.log('PUT');
            } else {
                $http.post('/api/playlists', {'playlist':playlist}).then(function (response) {
                    console.log('Repsonse', response);
                    
                }, function (response) {
                    console.log('Repsonse', response);

                });
            }
        };

        $scope.getPlaylists();

    }]);
