var tape = require('tape');
var Carmen = require('..');
var index = require('../lib/index');
var context = require('../lib/context');
var mem = require('../lib/api-mem');
var queue = require('d3-queue').queue;
var addFeature = require('../lib/util/addfeature');
var unidecode = require('unidecode-cxx');
var token = require('../lib/util/token');
var termops = require('../lib/util/termops');

var conf = {
    country: new mem(null, function() {}),
    region: new mem(null, function() {}),
    postcode: new mem(null, function() {}),
    place: new mem(null, function() {}),
    address: new mem({
        maxzoom: 6,
        geocoder_address: 1,
        geocoder_tokens: {"Drive": "Dr"},
        geocoder_format: '{country._name}, {region._name}{place._name}{address._name}{address._number}'
    }, function() {})
};
var c = new Carmen(conf);

tape('index country', function(t) {
    var country = {
        id:1,
        properties: {
            'carmen:text':'United States',
            'carmen:zxy':['6/32/32'],
            'carmen:center':[0,0]
        }
    };
    addFeature(conf.country, country, t.end);
});

tape('index region', function(t) {
    var region = {
        id:1,
        properties: {
            'carmen:text':'Colorado',
            'carmen:zxy':['6/32/32'],
            'carmen:center':[0,0]
        }
    };
    addFeature(conf.region, region, t.end);
});

tape('index postcode', function(t) {
    var postcode = {
        id:1,
        properties: {
            'carmen:text':'80138',
            'carmen:zxy':['6/32/32'],
            'carmen:center':[0,0]
        }
    };
    addFeature(conf.postcode, postcode, t.end);
});

tape('index place', function(t) {
    var place = {
        id:1,
        properties: {
            'carmen:text':'Parker',
            'carmen:zxy':['6/32/32'],
            'carmen:center':[0,0]
        }
    };
    addFeature(conf.place, place, t.end);
});

tape('index address', function(t) {
    var address = {
        id:1,
        properties: {
            'carmen:text':'S Pikes Peak Dr',
            'carmen:zxy':['6/32/32'],
            'carmen:center':[0,0],
            'carmen:addressnumber': ['11027']
        },
        geometry: {
            type: 'MultiPoint',
            coordinates: [[0,0],[0,0],[0,0]]
        }
    };
    addFeature(conf.address, address, t.end);
});

tape('Check relevance scoring', function(t) {
    c.geocode('11027 S. Pikes Peak Drive #201', {limit_verify: 1}, function(err, res) {
        t.ifError(err);
        t.equal(res.features[0].relevance, .49, "Apt. number lowers relevance");
    });
    c.geocode('Colorado Parker', {limit_verify: 1}, function(err, res) {
        t.ifError(err);
        t.equal(res.features.length, 0, "No features when ordered from big-to-small");
    });
    c.geocode('11027 S. Pikes Peak Drive', {limit_verify: 1}, function(err, res) {
        t.ifError(err);
        t.equal(res.features[0].relevance, .99, "High relevance with no apartment number");
        t.end()
    });
});

tape('teardown', function(assert) {
    context.getTile.cache.reset();
    assert.end();
});