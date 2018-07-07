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

//for mailchimp validator
app.get("/event/subscribe", (req, res) => {
  res.json(true);
});
//for actual wh
app.post("/event/subscribe", (req, res) => {
  if (
    req.body != undefined &&
    req.body.type == "subscribe"
  ) {
    //send request to discord api via vh
    axios
      .post(
        process.env.DISCORD_WH_URL,
        {
          embeds: [
            {
              title: "New subscriber!",
              fields: [
                {
                  name: 'Email',
                  value: req.body['data[email]']
                },
                {
                  name: 'Ip',
                  value: req.body['data[ip_opt]']
                }
              ]
            }
          ]
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
              message: "Error while requesting the discord api"
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
          code: 400
        }
      })
      .end();
  }
});


console.log("The newsletter api server listen on " + process.env.LISTEN_HOST + ":" + process.env.LISTEN_PORT);

app.listen(process.env.LISTEN_PORT, process.env.LISTEN_HOST);
