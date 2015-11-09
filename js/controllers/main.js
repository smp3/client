Smp3Controllers.controller('Smp3MainCtrl', ['$scope', '$location', '$http', '$httpParamSerializer', 'ngAudio', 'store', 'PlayerService',
    'PlaylistService', 'DiscogsService', 'LyricsService',
    function ($scope, $location, $http, $httpParamSerializer, ngAudio, store,
    player, playlist, discogs, lyrics) {

        
        var config = store.get('config');
        
        $scope.mode = 'library';

        if (!config) {
            $location.path('/config');
        }

        $scope.artist = null;
        $scope.album = null;

        $scope.discover = function () {
            $http.get('/api/discover').success(function (data) {
                $scope.getLibrary();
            });
        };

        $scope.logout = function () {
            console.log('logout');
            store.set('jwt', '');
            $location.path('/login');
        };

        $scope.setArtist = function (artist) {
            $scope.artist = artist;
            $scope.getLibrary();
            discogs.fetchArtist(artist);
        };

        $scope.setAlbum = function (album) {
            $scope.album = album;
            console.log(album);
            $scope.getLibrary();
        };

        $scope.getLibrary = function () {
            var
                    library_url = '/api/library',
                    artists_url = '/api/library/artists',
                    albums_url = '/api/library/albums'
                    ;

            var params = {};

            if ($scope.artist) {
                params['artist'] = $scope.artist.name;
            }

            if ($scope.album) {
                params['album'] = $scope.album.title;
            }

            var serialized_params = $httpParamSerializer(params);


            library_url += '?' + serialized_params;
            artists_url += '?' + serialized_params;
            albums_url += '?' + serialized_params;


            $http.get(artists_url).success(function (data) {
                $scope.artists = data;
            });

            $http.get(albums_url).success(function (data) {
                $scope.albums = data;
            });

            $http.get(library_url).success(function (data) {
                $scope.library = data;
            });
        };

        $scope.play = function (file) {
            player.play(file);
            //lyrics.getLyrics(file.track.title, file.artist.name);
        };

        $scope.enqueue = function (file) {
            playlist.enqueue(file);
        };

        $scope.getLibrary();

    }]);
