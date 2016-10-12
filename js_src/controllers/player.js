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