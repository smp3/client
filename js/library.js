Library = {
    bind : function () {
      $('#library').on('click','li',function (e) {
          e.preventDefault();
          id = $(this).attr('data-id');
          console.log(id);
          Player.play(id);
      });
      
      $('#discover').click(function (e) {
         e.preventDefault();
         request({
            url: '/api/discover', 
            success: function(data) {
                
            }
         });
      });
    },
    
    loadLibrary : function () {
      request({
         url: '/api/library',
         success: function (data) {
             console.log(data);
             for (i in data) {
                 li = document.createElement("li");
                 $(li).attr('data-id', data[i].id);
                 $(li).html(data[i].file_name);
                 $('#library').append(li);
             }
             
         }
      });
  }  
};