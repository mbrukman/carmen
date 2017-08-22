const tape = require('tape');
const Carmen = require('..');
const context = require('../lib/context');
const mem = require('../lib/api-mem');
const queue = require('d3-queue').queue;
const addFeature = require('../lib/util/addfeature'),
    queueFeature = addFeature.queueFeature,
    buildQueued = addFeature.buildQueued;

(() => {
    const conf = { place: new mem(null, () => {}) };
    const c = new Carmen(conf);

    addFeature.setOptions({
        geocoder: c
    });

    tape('place', (t) => {
        let place = {
            id: 1,
            properties: {
                'carmen:score': 1,
                'carmen:text': 'Main Avenue of the Test Boulevard',
                'carmen:zxy': ['6/32/32'],
                'carmen:center': [0,0]
            }
        };
        queueFeature(conf.place, place, t.end);
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

    tape('Main Avenue of the Test Boulevard', (t) => {
        c.geocode('Main Avenue of the Test Boulevard', { limit_verify: 1 }, (err, res) => {
            t.ifError(err);
            t.deepEqual(res.features[0].place_name, 'Main Avenue of the Test Boulevard');
            t.deepEqual(res.features[0].id, 'place.1');
            t.end();
        });
    });

    tape('Maine Avene of the Tst Boulveard', (t) => {
        c.geocode('Maine Avene of the Tst Boulveard', { limit_verify: 1 }, (err, res) => {
            t.ifError(err);
            t.deepEqual(res.suggestions.length, 1);
            t.deepEquals(res.suggestions[0], 'main avenue of the test boulevard');
            t.end();
        });
    });
})();

tape('teardown', (t) => {
    context.getTile.cache.reset();
    t.end();
});

