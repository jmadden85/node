/*****************************************
    Module Dependencies
*****************************************/

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

/*****************************************
    Outputs current directory files
*****************************************/

//Called for each file walked in the directory
function file(i) {
    var filename = files[i];

    fs.stat(__dirname + '/' + filename, function (err, stat) {

        if ( stat.isDirectory() ) {
            console.log('    ' + i + '    \033[36m' + filename + '/\033[39m');
        } else {
            console.log('    ' + i + '    \033[90m' + filename + '\033[39m');
        }

        if ( ++i == files.length ) {
            read();
        } else {
            file(i);
        }
    });
}

fs.readdir(process.cwd(), function (err, files) {

    console.log('');

    if ( !files.length ) {
        return console.log('     \033[31m No files to show!\033[39m\n');
    }

    console.log('    Select which file or directory you want to see\n');

    file(0);
});