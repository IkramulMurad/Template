var helper = require('./helper');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersUpdateOne = function(req, res) {
    if(!req.params || !req.params.userid){
        helper.sendJsonResponse(res, 400, {
            "message" : "No user id in the request!"
        });
        return;
    }
    else if(!req.body || !req.body.name || !req.body.email || !req.body.password){
        helper.sendJsonResponse(res, 400, {
            "message" : "All the fields name, email and password are required!"
        });
        return;
    }
    User
        .findById(req.params.userid)
        .select('name email password')
        .exec(function(err, result){
            if(!result){
                helper.sendJsonResponse(res, 404, {
                    "message" : "User not found"
                });
                return;
            }
            else if(err){
                helper.sendJsonResponse(res, 404, err);
                return;
            }
            //update
            result.name = req.body.name;
            result.email = req.body.email;
            result.password = req.body.password;
            //save
            //result.save() only works for findById() method
            result.save(function(err, result){
                if(err){
                    helper.sendJsonResponse(res, 404, err);
                }
                else{
                    helper.sendJsonResponse(res, 200, result);
                }
            });
        });
};