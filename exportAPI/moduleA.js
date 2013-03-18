exports.name = 'Joe';
exports.data = 'Here is dis data';

var privateVariable = 5;

exports.getPrivate = function () {
    return privateVariable;
};