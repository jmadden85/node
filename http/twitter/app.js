var http = require('http');
var qs = require('querystring');

var key = 'iiB7qKuOGCm0gAT9QomIg';
var secret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg';
var token = key + ':' + secret;
var base64Token = new Buffer(token).toString('base64');

var headers = {
    'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization' : 'Basic ' + base64Token
};

//Get token
var tweetToken = http.request({
    host : 'api.twitter.com',
    method : 'POST',
    headers : headers
}, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
});

tweetToken.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

tweetToken.write('grant_type=client_credentials');
tweetToken.end();

var search = process.argv.slice(2).join(' ').trim();

if ( !search.length ) {
    return console.log('\n Usage: node tweets <search term>\n');
}

console.log('\n searching for: \033[96m' + search + '\033[39m\n');
http.request({
    host : 'api.twitter.com/1.1',
    path : '/search/tweets.json?' + qs.stringify({ q : search })
}, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        var obj = JSON.parse(body);
        obj.results.forEach(function (tweet) {
            console.log(' \033[90m' + tweet.text + '\033[39m');
            console.log(' \033[94m' + tweet.from_user + '\033[39m');
            console.log('--');
        });
    });
}).end();