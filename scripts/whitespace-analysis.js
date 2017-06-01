let fs = require('fs');
let split = require('split');
let stream = require('stream');

// 1. Add a basic no-op CLI command scripts/whitespace-analysis.js that
// can handle an input stream and output the input without any changes
//
// eg. cat us-place-text-uniq.txt | ./scripts/whitespace-analysis.js
//
// 2. Modify the script to lowercase and call the whitespace remover
// utility function on each incoming line
//
// 3. Adjust the script to store a mapping between output and input strings
// and output the results in a format you can use to answer the questions above.

// # Initial script just normalizes output
// Spring Field Town => springfieldtown
// Springfield Town  => springfieldtown


// 
// you may want to continue to read from `process.stdin`
// by using stdin you can let `cat` do the file reading for you
//
// ```cat <any file> | <your command>
// ```


let file1 = require('../us-address-text-unique.txt');

process.stdin
.pipe(split())
.on('data', function(line) {
    console.log('Heres a line: ' + line);
});

let converter = new stream.Transform({ objectMode: true });
converter._transform = function(data, enc, callback) {
    let query = data.toString()
    this.push(query + '\n');
    callback();
};




// # Next pass lets you go backwards from result to possible input values
// springfieldtown => ["Spring Field Town", "Springfield Town"]
