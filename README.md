# Newsletter API

Simple API made with node to subscribe email to a mailchimp list

## Installation

- clone this repository
- `npm install`
- Puts your environments varibles in a `.env` file
- `node app.js`

You can use [Pm2](http://pm2.keymetrics.io/)

## Usage

```
POST /subscribe
{
  "email": "hello@example.com"  
}
```

## Environments variables

Example of `.env` file in `.env.example`.

| Name | Example value |
|----------|----------|
|LISTEN_PORT |  80 |
|MAILCHIMP_SUBSCRIBE_URL | https://XXX.api.mailchimp.com/3.0/lists/XXXX/members |
| MAILCHIMP_API_KEY | XXXXXXXXXXXXXXXXXXXXXXXXXXXXX  |
