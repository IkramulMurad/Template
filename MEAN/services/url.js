module.exports.getUrl = function(req){
    var url = "";
    if(req.protocol){
        url += req.protocol;
        url += "://";
    }
    if(req.hostname) url += req.hostname;
    if(req.path) url += req.path;
    if(req.search) url += req.search;
    return url;
};