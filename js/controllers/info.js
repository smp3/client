Smp3Controllers.controller('Smp3InfoCtrl', ['$scope', 'DiscogsService',
    function ($scope, discogs) {
        $scope.visible = true;
        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
        };
        
        discogs.initialize();
        discogs.bindScope($scope);
    }]);
