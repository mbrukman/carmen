const tape = require('tape');
const Carmen = require('..');
// const context = require('../lib/context');
const mem = require('../lib/api-mem');
const queue = require('d3-queue').queue;
const addFeature = require('../lib/util/addfeature'),
    queueFeature = addFeature.queueFeature,
    buildQueued = addFeature.buildQueued;

const conf = {
    city: new mem({
        maxzoom: 6,
        collapseWhiteSpace: true
    }, () => {}),
    street: new mem({
        maxzoom: 6,
        geocoder_address: 1,
        collapseWhiteSpace: true
    }, () => {})
};
const c = new Carmen(conf);
// tape('index Eiffel Tower', (t) => {
//     let landmark = {
//         "id":1,
//         "properties": {
//             'carmen:text':'Eiffel Tower'
//         },
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             -74.01034355163574,
//             40.706912973264785
//           ]
//         }
//     };
//     queueFeature(conf.landmark, landmark, t.end);
// });
tape('index city', (t) => {
    let city = {
        "id":1,
        "properties": {
            'carmen:text':'New York'
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -74.0105152130127,
                        40.70792146442606
                    ],
                    [
                        -74.01156663894653,
                        40.707043102014715
                    ],
                    [
                        -74.0103006362915,
                        40.70640872195707
                    ],
                    [
                        -74.00937795639038,
                        40.70714069841032
                    ],
                    [
                        -74.0105152130127,
                        40.70792146442606
                    ]
                ]
            ]
        }
    };
    queueFeature(conf.city, city, t.end);
});
tape('index Wall St', (t) => {
    let street = {
        "id":1,
        "properties": {
            'carmen:text':'Wall St'
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                -74.01034355163574,
                40.706912973264785
            ]
        }
    };
    queueFeature(conf.street, street, t.end);
});

tape('build queued features', (t) => {
    const q = queue();
    Object.keys(conf).forEach((c) => {
        q.defer((cb) => {
            buildQueued(conf[c], cb);
        });
    });
    q.awaitAll(t.end);
});

tape('query for "wall st new york"', (assert) => {
    c.geocode('wall st new york', { limit_verify:1 }, (err, res) => {
        assert.deepEqual(res.features[0].place_name, 'Wall St, New York', 'query for "wall st new york" returns "Wall St"');
        assert.end();
    });
});

tape('query for "wallst new york"', (assert) => {
    c.geocode('wallst new york', { limit_verify:1 }, (err, res) => {
        assert.equal(res.features.length > 0, true, 'query for "wallst new york" returns any feature');
        assert.deepEqual(res.features[0].place_name, 'Wall St, New York', 'query for "wallst new york" returns "Wall St"');
        assert.end();
    });
});

tape('test index contents for newyork', (assert) => {
    assert.equal(Array.from(conf.city._dictcache)[0], 'newyork', 'test index contents for newyork');
    assert.end();
});

tape('test index contents for wallst', (assert) => {
    assert.equal(Array.from(conf.street._dictcache)[0], 'wallst', 'test index contents for wallst');
    assert.end();
});

tape('test index contents for grid/newyork', (assert) => {
    assert.equal(Array.from(conf.city._geocoder.grid.list())[0][0], 'newyork', 'test index contents for newyork');
    assert.end();
});

tape('test index contents for grid/wallst', (assert) => {
    assert.equal(Array.from(conf.street._geocoder.grid.list())[0][0], 'wallst', 'test index contents for wallst');
    assert.end();
});

//
// tape('teardown', (t) => {
//     context.getTile.cache.reset();
//     t.end();
// });
