Smp3Controllers.controller('Smp3InfoCtrl', ['$scope', 'DiscogsService', 'LyricsService',
    function ($scope, discogs, lyrics) {
        $scope.visible = true;
        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
        };
        
        discogs.initialize();
        lyrics.initialize();
        discogs.bindScope($scope);
    }]);
