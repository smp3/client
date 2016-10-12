smp3App.service('PlaylistService', ['store', function (store) {
        var $this = this;

        this.bindScope = function (scope) {
            $this.scope = scope;
            $this.scope.playlists = [];
            $this.scope.pointer = 0;
            $this.scope.current_playlist = null;
        };
        
        this.findFirst = function () {
            if ($this.scope.playlists.length !== 0) {
                return $this.scope.playlists[0];
            }
            
            return null;
        };

        this.makePlaylist = function (title) {
            return {
                title: title,
                items: []
            };

        };

        this.empty = function () {
            return $this.scope.current_playlist.items.length == 0;
        };

        this.checkDefault = function () {
            if (!$this.scope.current_playlist) {

                if ($this.scope.playlists.length === 0) {
                    defaultPlaylist = this.makePlaylist('New playlist');
                    $this.scope.playlists.push(defaultPlaylist);
                    this.setCurrent(defaultPlaylist);
                } else {
                    this.setCurrent($this.scope.playlists[0]);
                }
            }
        };

        this.enqueue = function (file) {
            this.checkDefault();
            $this.scope.current_playlist.items.push({file: file});
        };

        this.clear = function () {
            $this.scope.queue = [];
            $this.scope.pointer = 0;
        };

        //TODO rename that properly
        this.setCurrent = function (playlist) {
            //$this.clear();
            console.log('setCurrent', playlist);
            $this.scope.current_playlist = playlist;

        };

        this.getCurrent = function () {
            return $this.scope.current_playlist.items[$this.scope.pointer];
        };
        
        this.getCurrentPlaylist = function() {
            return $this.scope.current_playlist;
        };

        this.hasNext = function () {
            return $this.scope.pointer + 1 < $this.scope.current_playlist.items.length;
        };

        this.next = function () {
            $this.scope.pointer++;
            return $this.getCurrent().file;
        };

        this.setPointer = function (index) {
            $this.scope.pointer = index;
        };



        this.transformToSend = function (playlist) {
            pl = {id: playlist.id, title: playlist.title, items: []};

            oldItems = playlist.items;

            for (var i in oldItems) {
                pl.items.push(oldItems[i].file.id);
            }

            return pl;
        };

        this.delete = function (index) {
            $this.scope.current_playlist.items.splice(index, 1);
            if ($this.scope.pointer == index) {
                $this.scope.pointer = 0;
            }
        };

        this.isPersisted = function (playlist) {
            if (!playlist) {
                playlist = $this.scope.current_playlist;
            }

            if (playlist.id) {
                return true;
            } else {
                return false;
            }
        };



    }]);