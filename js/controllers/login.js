Smp3Controllers.controller('Smp3LoginCtrl', ['$scope', '$http', 'store', '$location',
    function ($scope, $http, store, $location) {
        var stored_config = store.get('config');
        $scope.login = function (user) {
            console.log('login', user);
            if ($scope.config.server_url) {
                stored_config.server_url = $scope.config.server_url;
                console.log(stored_config); 
                store.set('config', stored_config);
            }
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
