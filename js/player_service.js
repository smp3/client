smp3App.service('PlayerService', ['ngAudio', 'store', function (ngAudio, store) {
    var $this = this;

    this.sound = null;
    this.scope = null;
    
    this.bindScope = function (scope) {
        $this.scope = scope;
    };

    this.play = function (file) {
        if ($this.sound) {
            $this.sound.stop();
        }
        $this.scope.current_file = file;

        token = store.get('jwt');
        $this.sound = ngAudio.load('http://localhost:8000/api/' + file.id + '/stream.json?token=' + token);
        
        
        
       $this.sound.complete(function() {
           console.log('complete');
           $this.sound.stop();
           $this.scope.current_file = null;
       });
       
        $this.sound.play();
        
    };
}]);


