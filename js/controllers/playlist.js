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
