smp3App.service('DiscorgsService', ['$http', 'store', 'ConfigService', function ($http, store, config) {
        this.initialize = function () {
            // store.config.excempt_urls
            config.addExcemptUrl('https://api.discogs.com');
            var cfg = store.get('config');
            console.log('cfg', cfg);
        };

        this.hasConfig = function () {
            var cfg = store.get('config');
            console.log(cfg);
            return cfg.discogs_key && cfg.discogs_secret;
        };

        this.appendKey = function (url) {
            if(!this.hasConfig()) {
                alert('Discogs not configured');
                return url;
            }
            
            var cfg = store.get('config');
            return url + '&key='+cfg.discogs_key+'&secret='+cfg.discogs_secret;

        };

        this.getArtist = function (artist) {
            if(!artist) {
                return;
            }
            $http.jsonp(this.appendKey('https://api.discogs.com/database/search?callback=JSON_CALLBACK&type=artist&q='+artist.name))
                    .then(function (res) {
                        console.log(res.data.data.results);
                        if (res.data.data.results.length > 0) {
                            d = res.data.data.results[0]
                            console.log(d.resource_url);
                            $http.jsonp(d.resource_url + '?callback=JSON_CALLBACK').then(function (data) {
                                console.log('res data', data);
                            });
                        }
                        console.log('Discorgs data', res);
                    });
        };
    }]);