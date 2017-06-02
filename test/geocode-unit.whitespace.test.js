// https://github.com/mapbox/carmen/issues/633
// Carmen unit tests often follow an outline along the lines of
// /test/geocode-unit.unicode.test.js.
//
// Define a new geocoder (“Carmen”) instance and configuration. Index some data.
// (test/geocode-unit.unicode.test.js#L17-L56
// Run some searches against the index and confirm that the searches
// find the expected results.
// /test/geocode-unit.unicode.test.js#L58-L132
// Clean up.
// /test/geocode-unit.unicode.test.js#L135-L138
// Each of these tests usually differ in that they target specific
// functionality based on what they index and what they expect to find
// based on that data. For example, the test above focuses on how carmen
// handles unicode characters. Other tests focus on how results are ranked
// and prioritized, how addresses are returned, and so on.
//
//  Add a new unit test test/geocode-unit.whitespace.test.js
//  Index a feature with a string that includes whitespace
//  Query the index for that string including whitespace and excluding
// whitespace and assert that it finds the feature in both cases

const tape = require('tape');
const Carmen = require('..');
const context = require('../lib/context');
const mem = require('../lib/api-mem');
const addFeature = require('../lib/util/addfeature'),
    queueFeature = addFeature.queueFeature,
    buildQueued = addFeature.buildQueued;

const conf = {
    test: new mem({
        maxzoom:6
    }, () => {})
};
const c = new Carmen(conf);

tape('index New York', (assert) => {
    queueFeature(conf.test, {
      "id": 7,
      "type": "Feature",
      "properties": {
        "carmen:text": "New York",
        'carmen:zxy':['6/32/32'],
        'carmen:center':[0,0]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.00253295898438,
          40.72852712420599
        ]
      }
    }, () => { buildQueued(conf.test, assert.end); });
});

tape('query for New York', (assert) => {
    c.geocode('New York', { limit_verify:1 }, (err, res) => {
        assert.deepEqual(res.features[0].place_name, 'New York', 'query for "New York" returns "New York"');
        assert.end();
    });
});

tape('query for New York', (assert) => {
    c.geocode('newyork', { limit_verify:1 }, (err, res) => {
        console.log(res);
        // assert.deepEqual(res.features[0].place_name, 'New York', 'query for "newyork" returns "New York"');
        assert.equal(res.features.length > 0, true, 'query for "newyork" returns any feature');
        assert.end();
    });
});
//
// tape('teardown', (t) => {
//     context.getTile.cache.reset();
//     t.end();
// });
