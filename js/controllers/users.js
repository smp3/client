Smp3Controllers.controller('Smp3UsersCtrl', ['$scope', '$location', '$http', 'store', '$routeParams',
    function ($scope, $location, $http, store, $routeParams) {
        $scope.getAllUsers = function () {
            $http.get('/api/user/all').success(function (data) {
                $scope.users = data;
            });
        };

        $scope.getUser = function () {
            console.log('user_id', $routeParams.id);
            if (!$routeParams.id) {
                $scope.user = {
                };
            }
            $http.get('/api/users/' + $routeParams.id).success(function (data) {
                $scope.user = data;
                console.log($scope.user);
            });
        };

        $scope.deleteUser = function (user) {
            $http({
                url: '/api/users/' + user.id,
                method: 'DELETE'
            }).then(function (response) {
                console.log(response);
                $scope.getAllUsers();
            },
                    function (response) {
                        console.log(response);
                    }
            );
        };

        $scope.saveUser = function (user) {
            var url, method;
            if (user.id) {
                url = '/api/users/' + user.id;
                method = 'PUT';
            } else {
                url = '/api/users';
                method = 'POST';
            }
            $http({
                url: url,
                method: method,
                data: user
            }).then(function (response) {
                console.log('Repsonse', response);


            }, function (response) {
                console.log('Repsonse', response);

            });
        };


    }]);