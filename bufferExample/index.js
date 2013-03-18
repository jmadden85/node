var myBuffer = new Buffer ('==ii1j2i3h1i23h', 'base64');

console.log(myBuffer);

require('fs').writeFile('logo.png', myBuffer);