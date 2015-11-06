smp3App.service('DiscogsService', ['$http', 'store', 'ConfigService', function ($http, store, config) {

        var $this = this;
        this.bindScope = function (scope) {
            this.scope = scope;
        };

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
            if (!this.hasConfig()) {
                alert('Discogs not configured');
                return url;
            }

            var cfg = store.get('config');
            return url + '&key=' + cfg.discogs_key + '&secret=' + cfg.discogs_secret;

        };

        this.getArtist = function (resource_url, additional) {
            $http.jsonp(resource_url + '?callback=JSON_CALLBACK').then(function (data) {
                $this.scope.artist = data.data.data;
                $this.scope.artist.additional = additional;
            });
        };

        this.biggestShared = function (artists, str) {
            var max_sh = 0, sh;

            for (i in artists) {
                if (artists[i].title.toLowerCase() === str.toLowerCase()) {
                    return artists[i];
                }
            }

            return artists[0];
        };

        this.fetchArtist = function (artist) {

            $http.jsonp(this.appendKey('https://api.discogs.com/database/search?callback=JSON_CALLBACK&type=artist&q=' + artist.name))
                    .then(function (res) {
                        if (res.data.data.results.length > 0) {
                            var d = $this.biggestShared(res.data.data.results, artist.name);
                            $this.getArtist(d.resource_url, d);
                        }
                    });
        };
    }]);