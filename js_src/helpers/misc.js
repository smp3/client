var hasUrl = function (urls, url) {
    for(var i in urls) {
        if(url.indexOf(urls[i])!==-1) {
            return true;
        }
    }
    return false;
};
