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
        assert.deepEqual(res.features[0].place_name, 'New York', 'query for "newyork" returns "New York"');
        assert.equal(res.features.length > 0, true, 'query for "newyork" returns any feature');
        assert.end();
    });
});

//
// tape('teardown', (t) => {
//     context.getTile.cache.reset();
//     t.end();
// });
