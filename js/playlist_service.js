smp3App.service('PlaylistService', ['store', function (store) {
        var $this = this;
        
        this.pointer = 0;
        this.queue = [];
        
        this.enqueue = function (file) {
            $this.queue.push(file);
        };

        this.clear = function () {
            $this.queue = [];
            $this.pointer=0;
        };
        
        this.getFile = function () {
             
        };

    }]);