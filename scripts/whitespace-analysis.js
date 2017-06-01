let fs = require('fs');
let split = require('split');
let stream = require('stream');
let termops = require('../lib/util/termops.js');

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

process.stdin
    .pipe(split())
    .on('data', function(line) {
        console.log(termops.removeWhiteSpace(line));
    });


// # Next pass lets you go backwards from result to possible input values
// springfieldtown => ["Spring Field Town", "Springfield Town"]
