Smp3Controllers.controller('Smp3InfoCtrl', ['$scope',
    function ($scope) {
        $scope.visible = true;
        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
        };
        
    }]);
