smp3App.service('PlaylistService', ['store', function (store) {
        var $this = this;

        this.bindScope = function (scope) {
            $this.scope = scope;
            $this.scope.queue = [];
            $this.scope.pointer = 0;
        };


        this.empty = function () {
            return $this.scope.queue.length == 0;
        };

        this.enqueue = function (file) {
            $this.scope.queue.push(file);
        };

        this.clear = function () {
            $this.scope.queue = [];
            $this.scope.pointer = 0;
        };

        this.getCurrent = function () {
            return $this.scope.queue[$this.scope.pointer];
        };

        this.hasNext = function () {
            return $this.scope.pointer + 1 < $this.scope.queue.length;
        };

        this.next = function () {
            $this.scope.pointer++;
            return $this.getCurrent();
        };

        this.setPointer = function (index) {
            $this.scope.pointer = index;
        };

        this.delete = function (index) {
            $this.scope.queue.splice(index, 1);
            if ($this.scope.pointer == index) {
                $this.scope.pointer = 0;
            }
        };


    }]);