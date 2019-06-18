# Browser Builds
FantasyGold core and most official submodules work in the browser, thanks to [browserify](http://browserify.org/) (some modules are not fully compatible with web browsers).

The easiest and recommended way to use them, is via [Bower](http://bower.io/), a browser package manager, and get the release bundles. For example, when building an app that uses `fantasygoldcore` and `fantasygoldcore-mnemonic`, you do:

```sh
bower install fantasygoldcore-lib
bower install fantasygoldcore-mnemonic
```

You can also use a `bower.json` file to store the dependencies of your project:

```json
{
  "name": "Your app name",
  "version": "0.0.1",
  "license": "MIT",
  "dependencies": {
    "fantasygoldcore": "^0.0.1",
    "fantasygoldcore-mnemonic": "^0.0.1"
  }
}
```

and run `bower install` to install the dependencies.

After this, you can include the bundled release versions in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <script src="bower_components/fantasygoldcore/fantasygoldcore-lib.min.js"></script>
  <script src="bower_components/fantasygoldcore-mnemonic/fantasygoldcore-mnemonic.min.js"></script>
</head>

<body>

  <script type="text/javascript">
    var fantasygoldcore = require('fantasygoldcore-lib');
    var Mnemonic = require('fantasygoldcore-mnemonic');
    // etc...
  </script>

</body>

</html>
```

## Building Custom Bundles
If you want to use a specific version of a module, instead of a release version (not recommended), you must run browserify yourself.  You can get a minified browser bundle by running the following on the project root folder.

```sh
browserify --require ./index.js:fantasygoldcore-lib | uglifyjs > fantasygoldcore-lib.min.js
```

```sh
browserify --require ./index.js:fantasygoldcore-mnemonic --external fantasygoldcore-lib | uglifyjs > fantasygoldcore-mnemonic.min.js
```

In many of the modules you can also run the command to build a browser bundle:
```sh
gulp browser
```
