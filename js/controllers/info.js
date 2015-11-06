Smp3Controllers.controller('Smp3InfoCtrl', ['$scope', 'DiscogsService',
    function ($scope, discogs) {
        discogs.initialize();
        discogs.bindScope($scope);
    }]);
