smp3App.service('PlayerService', ['ngAudio', 'store', 'PlaylistService', function (ngAudio, store, playlist) {
        var $this = this;

        this.sound = null;
        this.scope = null;

        
        
        this.bindScope = function (scope) {
            $this.scope = scope;
        };

        this.pause = function () {
            $this.sound.pause();
        };

        this.stop = function () {
            if ($this.sound) {
                $this.sound.stop();
                $this.scope.current_file = null;
            }
        };

        this.playCurrent = function () {
            if (!$this.sound) {
                return;
            }

            $this.sound.play();

        };

        this.setCurrent = function (file) {
            $this.scope.current_file = file;
        };

        this.play = function (file) {
            if ($this.sound) {
                $this.sound.stop();
            }

            $this.scope.current_file = file;

            token = store.get('jwt');
            config = store.get('config');
            
            $this.sound = ngAudio.load(config.server_url + '/api/stream/'+file.id+'?token=' + token);

            $this.sound.complete(function () {
                console.log('complete');
                if (playlist.empty() || !playlist.hasNext()) {
                    $this.sound.stop();
                    $this.scope.current_file = null;
                } else {
                    $this.play(playlist.next());
                }
            });

            $this.sound.play();

        };
    }]);


