Smp3Controllers.controller('Smp3PlaylistCtrl', ['$scope', '$location', '$http', 'store', 'PlayerService', 'PlaylistService',
    function ($scope, $location, $http, store, player, playlistService) {
        playlistService.bindScope($scope);

        $scope.getPlaylists = function () {
            console.log('playlists');
            $http.get('/api/playlists').success(function (data) {
                $scope.playlists = data;
                var new_playlist = playlistService.makePlaylist('Default');
                $scope.playlists.push(new_playlist);
                playlistService.setCurrent(new_playlist);
            });
        };

        $scope.play = function (index) {
            player.stop();
            playlistService.setPointer(index);
//            console.log(playlist.getCurrent());
            player.play(playlistService.getCurrent().file);
        };

        $scope.delete = function (index) {
            playlistService.delete(index);
        };

        $scope.newPlaylist = function () {
            console.log('newPlaylist');
//            var new_playlist = {
//                title: 'title',
//                playlist_files: []
//            };
            var new_playlist = playlistService.makePlaylist('title');
            $scope.playlists.push(new_playlist);
            //$scope.setCurrentPlaylist(new_playlist);

        };

        $scope.setCurrentPlaylist = function (current_playlist) {
            playlistService.setCurrent(current_playlist);
            console.log('Current playlist', current_playlist);
        };

        $scope.savePlaylist = function (playlist) {
            transformedPlaylist = playlistService.transformToSend(playlist);
            
            var url, method;
            
            if (playlist.id) { //PUT
                console.log('PUT');
                url = '/api/' + playlist.id + '/playlist';
                method = 'PUT';
            } else { //POST
                console.log('SAVE');
                url = '/api/playlists';
                method = 'POST';
            }

            $http({
                url: url,
                method: method,
                data: {'playlist': transformedPlaylist}
            }).then(function (response) {
                console.log('Repsonse', response);
                $scope.getPlaylists();

            }, function (response) {
                console.log('Repsonse', response);

            });

        };

        $scope.deletePlaylist = function (playlist_id) {
            $http({
                url: '/api/' + playlist_id + '/playlist',
                method: 'DELETE'
            }).then(
                    function (response) {
                        console.log('Response', response);
                        $scope.getPlaylists();
                    },
                    function (response) {
                        console.log('Response', response);
                    }
            );
        };



        $scope.getPlaylists();
  
        
    }]);
