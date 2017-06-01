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

// # Next pass lets you go backwards from result to possible input values
// springfieldtown => ["Spring Field Town", "Springfield Town"]


// What percentage of strings in each dataset end up overlapping with others
// once normalized?
//
// What are the actual string values that do end up overlapping?
// Which ones overlap in a potentially positive way
// (e.g. if Lake View Rd and Lakeview Rd collapse, that’s “positive” in
//   that users may expect to find one when searching for the other)?
// Which ones overlap in a potentially unexpected or negative way?

let total = 0;
let hash = {};
let result = 0;
let sameAmt = 0;
let array = [];

process.stdin
  .pipe(split())
  .on('data', (line) => {
    // normalize the lien
      let resultLine = line.toLowerCase();
      resultLine = termops.removeWhiteSpace(resultLine);
      // track total lines
      total++;
      // track # of times the line is the same
      if (hash[resultLine] !== undefined) {
          sameAmt++;
      } else {
          hash[resultLine] = [];
      }
      hash[resultLine].push(line);
  })
  .on('end', () => {
      console.log(hash);

      Object.keys(hash).forEach((el) => {
          if (hash[el].length > 1) {
              array.push(hash[el]);
          }
      });
      console.log(array);
      result = sameAmt/total;
      console.log(result);
  });
