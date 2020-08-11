var db = require('../app/db');

function handle_request(msg, callback) {
    db.getTopDownAnswers(msg, function (result) {
        callback(null,result);
    }, function (err) {
        callback(err,"Unable to retrieve top 5 downvoted answers")
    })
    
}

exports.handle_request = handle_request;