Smp3Controllers.controller('Smp3PlaylistCtrl', ['$scope', '$location', '$http', 'store', 'PlayerService', 'PlaylistService',
    function ($scope, $location, $http, store, player, playlistService) {
        playlistService.bindScope($scope);

        $scope.getPlaylists = function () {
            $http.get('/api/playlists').success(function (data) {
                $scope.playlists = data;
                if(!playlistService.getCurrentPlaylist()) {
                   playlistService.setCurrent(playlistService.findFirst());
                }
            });
        };

        $scope.play = function (index) {
            player.stop();
            playlistService.setPointer(index);

            toPlay = playlistService.getCurrent().file;

            player.play(toPlay);
        };

        $scope.delete = function (index) {
            playlistService.delete(index);
        };

        $scope.newPlaylist = function () {
            var new_playlist = playlistService.makePlaylist('title');
            $scope.playlists.push(new_playlist);
        };

        $scope.setCurrentPlaylist = function (current_playlist) {
            playlistService.setCurrent(current_playlist);
        };

        $scope.savePlaylist = function (playlist) {
            transformedPlaylist = playlistService.transformToSend(playlist);

            var url, method;

            if (playlist.id) { //PUT
                url = '/api/' + playlist.id + '/playlist';
                method = 'PUT';
            } else { //POST
                url = '/api/playlists';
                method = 'POST';
            }

            $http({
                url: url,
                method: method,
                data: {'playlist': transformedPlaylist}
            }).then(function (response) {
                $scope.getPlaylists();
            }, function (response) {
                console.log('Repsonse', response);

            });

        };

        $scope.deletePlaylist = function (playlist, index) {


            if (playlistService.isPersisted(playlist)) {
                $http({
                    url: '/api/' + playlist.id + '/playlist',
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
            } else {
                
                 $scope.playlists.splice(index, 1);
            }


        };



        $scope.getPlaylists();
       
      


    }]);
