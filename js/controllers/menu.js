Smp3Controllers.controller('Smp3MenuCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        $scope.getCurrentUser = function () {
            $http.get('/api/user/current').success(function (data) {
                $scope.current_user = data;
                console.log($scope.current_user);
            });
        };

        $scope.getCurrentUser();

    }]);