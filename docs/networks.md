# Networks
FantasyGoldcore provides support for the main FantasyGold network as well as for `testnet`, the current test blockchain. We encourage the use of `Networks.livenet` and `Networks.testnet` as constants. Note that the library sometimes may check for equality against this object. Please avoid creating a deep copy of this object.

The `Network` namespace has a function, `get(...)` that returns an instance of a `Network` or `undefined`. The only argument to this function is some kind of identifier of the network: either its name, a reference to a Network object, or a number used as a magic constant to identify the network (for example, the value `0` that gives FantasyGold addresses the distinctive `'1'` at its beginning on livenet, is a `0x6F` for testnet).

## Regtest

The regtest network is useful for development as it's possible to programmatically and instantly generate blocks for testing. It's currently supported as a variation of testnet. Here is an example of how to use regtest with the FantasyGoldcore Library:

```js
// Standard testnet
> fantasygoldcore.Networks.testnet.networkMagic;
<Buffer 0b 11 09 07>
```

```js
// Enabling testnet to use the regtest port and magicNumber
> fantasygoldcore.Networks.enableRegtest();
> fantasygoldcore.Networks.testnet.networkMagic;
<Buffer fa bf b5 da>
```

## Setting the Default Network
Most projects will only need to work with one of the networks. The value of `Networks.defaultNetwork` can be set to `Networks.testnet` if the project will need to only to work on testnet (the default is `Networks.livenet`).

## Network constants
The functionality of testnet and livenet is mostly similar (except for some relaxed block validation rules on testnet). They differ in the constants being used for human representation of base58 encoded strings. These are sometimes referred to as "version" constants.

Take a look at this modified snippet from [networks.js](https://github.com/fantasygold/fantasygoldcore-lib/blob/master/lib/networks.js)

```javascript
var livenet = new Network();
_.extend(livenet, {
  name: 'livenet',
  alias: 'mainnet',
  ubkeyhash: 0x23,
  privatekey: 0x8a,
  scripthash: 0x26,
  xpubkey: 0x08b8d23e,
  xprivkey: 0x02a7f14b,
  networkMagic: 0xd2bdf5a1,
  port: 57814
  
});

var testnet = new Network();
_.extend(testnet, {
  name: 'testnet',
  alias: 'testnet',
  pubkeyhash: 0x5f,
  privatekey: 0x8c,
  scripthash: 0x58,
  xpubkey: 0x0845c3f8,
  xprivkey: 0x03654388,
  port: 58806
});
```
