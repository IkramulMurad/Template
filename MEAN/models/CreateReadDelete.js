var helper = require('./helper');
var mongoose = require('mongoose');
var Owner = mongoose.model('Owner');

module.exports.ownersReadKeys = function(req, res) {
    if(!req.params || !req.params.userid){
        helper.sendJsonResponse(res, 404, {
            "message" : "No userid in the request!"
        });
        return;
    }
    Owner
        .find({"userid" : req.params.userid})
        .exec(function(err, result){
            if(!result || !result.length){
                helper.sendJsonResponse(res, 404, {
                    "message" : "No keys found!"
                });
                return;
            }
            else if(err){
                helper.sendJsonResponse(res, 404, err);
                return;
            }
            helper.sendJsonResponse(res, 200, result);
        });
};

module.exports.ownersCreate = function(req, res) {
    if(!req.body || !req.body.userid || !req.body.key){
        helper.sendJsonResponse(res, 400, {
            "message" : "All the fields userid and key are required!"
        });
        return;
    }

    var data = {
        userid : req.body.userid,
        key : req.body.key
    };

    Owner.create(data, function(err, result){
        if(err){
            helper.sendJsonResponse(res, 400, err);
        }
        else{
            helper.sendJsonResponse(res, 201, result);
        }
    });
};

module.exports.ownersDeleteOne = function(req, res) {
    if(!req.params || !req.params.userid || !req.params.key){
        helper.sendJsonResponse(res, 404, {
            "message" : "All the fields userid and key are required in the request"
        });
        return;
    }
    var queryObject = {
        userid : req.params.userid,
        key : req.params.key
    };
    Owner
        .find(queryObject)
        .exec(function(err, result){
            if(!result || !result.length){
                helper.sendJsonResponse(res, 404, {
                    "message" : "No item found to delete!"
                });
                return;
            }
            else if(err){
                helper.sendJsonResponse(res, 404, err);
                return;
            }
            Owner.remove(queryObject, function(err){
                if(err){
                    helper.sendJsonResponse(res, 404, err);
                }
                else{
                    helper.sendJsonResponse(res, 204, null);
                }
            });
        });
};