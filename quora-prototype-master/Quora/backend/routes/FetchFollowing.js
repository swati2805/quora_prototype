var express = require("express");
var router = express.Router();
const Model = require("../database/connection");

router.post('/', function (req, response) {
  console.log("Inside fetchfollowing post Request");
  console.log(req.body)
  Model.profile.findOne({ email: req.body.my_email }, (err, results) => {
      if (err) {
          console.log("Unable to fetch user profile", err);
          return response.status(400).json({ success: false, message: "Unable Find User" });
      } else {
          if(results) {
                      console.log("fetchFollowing using: "+JSON.stringify(results.following))
                      Model.profile.find( {email : { $in: results.following }}, (err1, results1) => {
                        if(err1) {

                          console.log(error)
                          response.status(400).json({ success: false, message: "Unable Find User" });
                          return;

                        } else {

                          if(results1) {

                            console.log("fetchFollowing sending: "+JSON.stringify(results1))
                            return response.status(200).json({ success: true, following : results1, message: "Successfully Added Follower" });

                          } else {
                            response.status(400).json({ success: false, message: "Unable Find User" });
                          }


                        }

                      });
          } else {
              console.log("user not found in profile table");
              return response.status(400).json({ success: false, message: "Unable Find User" });
          }
      }//big else

  });
});

module.exports = router;
