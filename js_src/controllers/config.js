Smp3Controllers.controller('Smp3ConfigCtrl', ['$scope', '$location', '$http', 'store',
    function ($scope, $location, $http, store) {
        $scope.config = store.get('config');
        $scope.saveConfig = function (config) {
            store.set('config', config);
            $location.path('/');
        };

    }]);