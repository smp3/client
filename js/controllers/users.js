Smp3Controllers.controller('Smp3UsersCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        $scope.getAllUsers = function () {
            $http.get('/api/user/all').success(function (data) {
                $scope.users = data;
            });
        };
        
        //$scope.getAllUsers();

    }]);