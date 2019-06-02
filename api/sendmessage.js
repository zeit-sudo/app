const { parse } = require('querystring');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_SMS_NUMBER;
var rp = require('request-promise');
var auth = 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64');

module.exports = (req, res) => {
  collectRequestData(req, result => {
    console.log(result);
    var options = {
      method: 'POST',
      uri: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      form: {
          // Like <input type="text" name="name">
          Body: 'Hello from Next.js!',
          From: '+'+twilioNumber,
          To: '+'+result.phone
      },
      headers: {
          /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
          'authorization': auth
      }
    };
  
    rp(options)
      .then(function (body) {
          // POST succeeded...
          // console.log(body)
          res.end("Check your phone!");
      })
      .catch(function (err) {
          // POST failed...
          res.end(JSON.stringify(err));
      });
  });
}

function collectRequestData(request, callback) {
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  const APPLICATION_JSON = 'application/json';
  if(request.headers['content-type'] === FORM_URLENCODED) {
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          callback(parse(body));
      });
  }
  else {
      callback(null);
  }
}