// const { parse } = require('querystring');
const accountSid = 'ACxxxx';
const authToken = 'xxx';
const twilioNumber = '14154154155'
var rp = require('request-promise');
var auth = 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64');

module.exports = (req, res) => {
  collectRequestData(req, result => {
    console.log(result);
    var options = {
      method: 'POST',
      uri: 'https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json',
      form: {
          // Like <input type="text" name="name">
          Body: 'Hello from Next.js!',
          From: '+'+twilioNumber,
          To: '+15305544694'
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
          res.end();
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
  if(request.headers['content-type'] === APPLICATION_JSON) {
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          callback(body);
      });
  }
  else {
      callback(null);
  }
}