
const basic = require('./basic').basic;


function main(args) {
    let result = '';
    let program = basic.compile(args.input);

    program.init({
        tty: {
            getCursorPosition: function() { return { x: 0, y: 0 }; },
            setCursorPosition: function() { },
            getScreenSize: function() { return { width: 80, height: 24 }; },
            writeChar: function(ch) { 
                //console.log('writeChar called with: '+ch);
                result += ch;
            },
            writeString: function(string) { 
                //console.log('writeString called with: '+string);
                result += string+'\n';
            },
            readChar: function(callback) {
                //callback(host.console.getc());
                callback('');
            },
            readLine: function(callback, prompt) {
                //host.console.puts(prompt);
                //callback(host.console.gets().replace(/[\r\n]*/, ''));
                callback('');
            }
        }
    });

    driver = function() {
        var state;
        do {
            try {
                state = program.step(driver);
            } catch(e) {
                console.log('ERROR!');
                return {
                    error:e
                }
            }
            // may throw basic.RuntimeError
        } while (state === basic.STATE_RUNNING);
    }
    driver(); // step until done or blocked

    return {result:result};

}

exports.main = main;
