var express = require("express");
var app = express();
require("dotenv").config();
var cors = require("cors");
var axios = require("axios");
var validator = require("validator");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.post("/subscribe", (req, res) => {
  //send request to mailchimp api
  if (
    req.body != undefined &&
    req.body.email != undefined &&
    req.body.email.length > 5 &&
    validator.isEmail(req.body.email)
  ) {
    axios
      .post(
        process.env.MAILCHIMP_SUBSCRIBE_URL,
        {
          email_address: req.body.email,
          status: "subscribed"
        },
        {
          auth: {
            username: "node",
            password: process.env.MAILCHIMP_API_KEY
          }
        }
      )
      .then(response => {
        res.json({
          success: true
        });
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({
            success: false,
            error: {
              code: 500,
              message: "Error while requesting the mailchimp api"
            }
          })
          .end();
      });
  } else {
    res
      .status(400)
      .json({
        success: false,
        error: {
          code: 400,
          message: "The email is invalid or not provided"
        }
      })
      .end();
  }
});

console.log("The newsletter api server listen on " + process.env.LISTEN_PORT);

app.listen(process.env.LISTEN_PORT);
