#!/usr/bin/env node

const fs = require('fs');
const split = require('split');
const stream = require('stream');
const termops = require('../lib/util/termops.js');

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


process.stdin
    .pipe(split())
    .on('data', function(line) {
      let result = line.toLowerCase();
      result = termops.removeWhiteSpace(result)
        console.log(result);
    });


// # Next pass lets you go backwards from result to possible input values
// springfieldtown => ["Spring Field Town", "Springfield Town"]
