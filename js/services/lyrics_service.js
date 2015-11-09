smp3App.service('LyricsService', ['$http', 'ConfigService', function ($http, config) {
        this.initialize = function () {
            config.addExcemptUrl('http://lyrics.wikia.com');
        };
        
        this.getLyrics = function(title, artist) {
            var url='http://lyrics.wikia.com/api.php?action=lyrics&artist='
                    +'Veil+Of+Maya'+'&song='+'Mikasa'+'&fmt=json'
                    +'&callback=?'
            ;
            console.log(url);
            $http.jsonp(url).then(function (data) {
                console.log(data);
            }, function(data) {
                console.log('error', data);
            });
        };
}]);