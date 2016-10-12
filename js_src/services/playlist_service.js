smp3App.service('PlaylistService', ['store', function (store) {
        var $this = this;

        this.bindScope = function (scope) {
            $this.scope = scope;
            $this.scope.playlists = [];
            $this.scope.pointer = 0;
            $this.scope.current_playlist = null;
        };

        this.makePlaylist = function (title) {
            return {
                title: title,
                items: []
            };

        };

        this.empty = function () {
            return $this.scope.current_playlist.playlist_files.length == 0;
        };

        this.enqueue = function (file) {
            console.log(file);
            $this.scope.current_playlist.items.push({file: file});
        };

        this.clear = function () {
            $this.scope.queue = [];
            $this.scope.pointer = 0;
        };

        this.setCurrent = function (playlist) {
            //$this.clear();
            console.log('setCurrent', playlist);
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

       
        
        this.transformToSend = function (playlist) {
            pl = {id: playlist.id, title: playlist.title, items: []};
            
            oldItems = playlist.items;
            
            for(var i in oldItems) {
                pl.items.push(oldItems[i].file.id);
            }
            
            return pl;
        };

        this.delete = function (index) {
            $this.scope.current_playlist.playlist_files.splice(index, 1);
            if ($this.scope.pointer == index) {
                $this.scope.pointer = 0;
            }
        };


    }]);