Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store', '$location',
    function ($scope, $http, store, $location) {
        $scope.login = function (user) {
            console.log('login', user);
            $http.post('/api/login_check', user).then(function (response) {
                console.log('Repsonse', response);
                if (response.status = 200 && response.data.token) {
                    store.set('jwt', response.data.token);
                    $location.path('/');
                }
            }, function (response) {
                console.log(response);
                if (response.status == 401) {
                    $scope.error = response.data;
                } else {
                    $scope.error = 'Unexpected error, code: ' + response.status
                }

            });
        };
    }]);
