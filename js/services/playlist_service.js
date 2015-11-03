smp3App.service('PlaylistService', ['store', function (store) {
        var $this = this;

        this.bindScope = function (scope) {
            $this.scope = scope;
            $this.scope.playlists = [];
            $this.scope.pointer = 0;
            $this.scope.current_playlist = null;
        };


        this.empty = function () {
            return $this.scope.current_playlist.playlist_files.length == 0;
        };

        this.enqueue = function (file) {
            $this.scope.current_playlist.playlist_files.push({file: file});
        };

        this.clear = function () {
            $this.scope.queue = [];
            $this.scope.pointer = 0;
        };

        this.setCurrent = function (playlist) {
            //$this.clear();
            $this.scope.current_playlist = playlist;

        };

        this.getCurrent = function () {
            return $this.scope.current_playlist.playlist_files[$this.scope.pointer];
        };

        this.hasNext = function () {
            return $this.scope.pointer + 1 < $this.scope.current_playlist.playlist_files.length;
        };

        this.next = function () {
            $this.scope.pointer++;
            return $this.getCurrent().file;
        };

        this.setPointer = function (index) {
            $this.scope.pointer = index;
        };

        this.delete = function (index) {
            $this.scope.current_playlist.playlist_files.splice(index, 1);
            if ($this.scope.pointer == index) {
                $this.scope.pointer = 0;
            }
        };


    }]);