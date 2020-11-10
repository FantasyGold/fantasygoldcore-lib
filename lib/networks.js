'use strict';
var _ = require('lodash');

var BufferUtil = require('./util/buffer');
var JSUtil = require('./util/js');
var networks = [];
var networkMaps = {};

/**
 * A network is merely a map containing values that correspond to version
 * numbers for each bitcoin network. Currently only supporting "livenet"
 * (a.k.a. "mainnet") and "testnet".
 * @constructor
 */
function Network() {}

Network.prototype.toString = function toString() {
  return this.name;
};

/**
 * @function
 * @member Networks#get
 * Retrieves the network associated with a magic number or string.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
 * @return Network
 */
function get(arg, keys) {
  if (~networks.indexOf(arg)) {
    return arg;
  }
  if (keys) {
    if (!_.isArray(keys)) {
      keys = [keys];
    }
    var containsArg = function(key) {
      return networks[index][key] === arg;
    };
    for (var index in networks) {
      if (_.any(keys, containsArg)) {
        return networks[index];
      }
    }
    return undefined;
  }
  return networkMaps[arg];
}

/**
 * @function
 * @member Networks#add
 * Will add a custom Network
 * @param {Object} data
 * @param {string} data.name - The name of the network
 * @param {string} data.alias - The aliased name of the network
 * @param {Number} data.pubkeyhash - The publickey hash prefix
 * @param {Number} data.privatekey - The privatekey prefix
 * @param {Number} data.scripthash - The scripthash prefix
 * @param {Number} data.xpubkey - The extended public key magic
 * @param {Number} data.xprivkey - The extended private key magic
 * @param {Number} data.networkMagic - The network magic number
 * @param {Number} data.port - The network port
 * @param {Array}  data.dnsSeeds - An array of dns seeds
 * @return Network
 */
function addNetwork(data) {

  var network = new Network();

  JSUtil.defineImmutable(network, {
    name: data.name,
    alias: data.alias,
    pubkeyhash: data.pubkeyhash,
    privatekey: data.privatekey,
    scripthash: data.scripthash,
    xpubkey: data.xpubkey,
    xprivkey: data.xprivkey
  });

  if (data.networkMagic) {
    JSUtil.defineImmutable(network, {
      networkMagic: BufferUtil.integerAsBuffer(data.networkMagic)
    });
  }

  if (data.port) {
    JSUtil.defineImmutable(network, {
      port: data.port
    });
  }

  if (data.dnsSeeds) {
    JSUtil.defineImmutable(network, {
      dnsSeeds: data.dnsSeeds
    });
  }
  _.each(network, function(value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      networkMaps[value] = network;
    }
  });

  networks.push(network);

  return network;

}

/**
 * @function
 * @member Networks#remove
 * Will remove a custom network
 * @param {Network} network
 */
function removeNetwork(network) {
  for (var i = 0; i < networks.length; i++) {
    if (networks[i] === network) {
      networks.splice(i, 1);
    }
  }
  for (var key in networkMaps) {
    if (networkMaps[key] === network) {
      delete networkMaps[key];
    }
  }
}

addNetwork({
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 0x23,
  privatekey: 0x8a,
  scripthash: 0x26,
  xpubkey: 0x08b8d23e,
  xprivkey: 0x02a7f14b,
  networkMagic: 0xd2bdf5a1,
  port: 57814,
  dnsSeeds: [

  ]
});

/**
 * @instance
 * @member Networks#livenet
 */
var livenet = get('livenet');

addNetwork({
  name: 'testnet',
  alias: 'regtest',
  pubkeyhash: 0x5f,
  privatekey: 0x8c,
  scripthash: 0x58,
  xpubkey: 0x0845c3f8,
  xprivkey: 0x03654388
});

/**
 * @instance
 * @member Networks#testnet
 */
var testnet = get('testnet');

// Add configurable values for testnet/regtest

var TESTNET = {
  PORT: 58806,
  NETWORK_MAGIC: BufferUtil.integerAsBuffer(0x0c33b6f0),
  DNS_SEEDS: [

  ]
};

for (var key in TESTNET) {
  if (!_.isObject(TESTNET[key])) {
    networkMaps[TESTNET[key]] = testnet;
  }
}

var REGTEST = {
  PORT: 59806,
  NETWORK_MAGIC: BufferUtil.integerAsBuffer(0xbda3c2f4),
  DNS_SEEDS: []
};

for (var key in REGTEST) {
  if (!_.isObject(REGTEST[key])) {
    networkMaps[REGTEST[key]] = testnet;
  }
}

Object.defineProperty(testnet, 'port', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.PORT;
    } else {
      return TESTNET.PORT;
    }
  }
});

Object.defineProperty(testnet, 'networkMagic', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.NETWORK_MAGIC;
    } else {
      return TESTNET.NETWORK_MAGIC;
    }
  }
});

Object.defineProperty(testnet, 'dnsSeeds', {
  enumerable: true,
  configurable: false,
  get: function() {
    if (this.regtestEnabled) {
      return REGTEST.DNS_SEEDS;
    } else {
      return TESTNET.DNS_SEEDS;
    }
  }
});

/**
 * @function
 * @member Networks#enableRegtest
 * Will enable regtest features for testnet
 */
function enableRegtest() {
  testnet.regtestEnabled = true;
}

/**
 * @function
 * @member Networks#disableRegtest
 * Will disable regtest features for testnet
 */
function disableRegtest() {
  testnet.regtestEnabled = false;
}

/**
 * @namespace Networks
 */
module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: livenet,
  livenet: livenet,
  mainnet: livenet,
  testnet: testnet,
  get: get,
  enableRegtest: enableRegtest,
  disableRegtest: disableRegtest
};
