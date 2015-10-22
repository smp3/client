var global_token = null;

function get_token() {
    var return_value = false;
    $.ajax({
        async: false,
        dataType: "json",
        url: '/api/login_check',
        type: "post",
        data: {"_username": "maciek", "_password": "test"},
        success: function (data) {
            console.log(data);
            return_value = data.token;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Bad credentials.');
        }
    });
    return return_value;
}

function request(params) {
    
    if (global_token===null) {
        global_token = get_token();
    }
    
    params.beforeSend = function (xhrObj) {
        //Authorization: Bearer {token}
        xhrObj.setRequestHeader("Authorization", 'Bearer '+global_token);
        
    };
    params.cache = false;
    params.error = function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 403 || xhr.status == 401) {
            console.log('Getting the token');
            global_token = get_token();
            console.log("Token is", global_token);
        }
    };
    $.ajax(params);
}