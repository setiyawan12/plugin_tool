
var is = require("electron-is");


function appendOutput(msg) { getCommandOutput().value += (msg + '\n'); };
function setStatus(msg) { getStatus().innerHTML = msg; };

function backgroundProcess() {
    const process = require('child_process');   // The power of Node.JS

    var cmd = (is.windows()) ? 'test.bat' : './shell/hehe.sh';
    // console.log('cmd:', cmd);

    var child = process.spawn(cmd);

    child.on('error', function (err) {
        appendOutput('stderr: <' + err + '>');
    });

    child.stdout.on('data', function (data) {
        appendOutput(data);
    });

    child.stderr.on('data', function (data) {
        appendOutput('stderr: <' + data + '>');
    });

    child.on('close', function (code) {
        if (code == 0)
            setStatus('child process complete.');
        else
            setStatus('child process exited with code ' + code);

        getCommandOutput().style.background = "DarkGray";
    });
};
