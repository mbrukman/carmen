const tape = require('tape');






// confirm function removes whitespace
tape('removeWhiteSpace', (assert) => {
  assert.deepEqual(value1, value2, 'removeWhiteSpace() removes whitespace');
  assert.end();
});

// What percentage of strings in each dataset end up overlapping with
// others once normalized?
tape('removeWhiteSpace', (assert) => {
  assert.deepEqual(value1, value2, '% of overlapping strings after whitespace is removed.');
  assert.end();
});

// What are the actual string values that do end up overlapping?
//

// Which ones overlap in a potentially positive way
// (e.g. if Lake View Rd and Lakeview Rd collapse, that’s “positive” in
//   that users may expect to find one when searching for the other)?
//
tape('removeWhiteSpace', (assert) => {
  assert.deepEqual(value1, value2, '% of + overlapping strings after whitespace is removed');
  assert.end();
});


// Which ones overlap in a potentially unexpected or negative way?
tape('removeWhiteSpace', (assert) => {
  assert.deepEqual(value1, value2, '% of -/undefined overlapping strings after whitespace is removed');
  assert.end();
});
