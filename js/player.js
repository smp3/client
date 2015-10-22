Player = {
    play : function(id) {
        source = document.createElement('source');
        $(source).attr('src','/api/'+id+'/stream.json?token='+global_token);
        $('#audio').html(source);
    }
}