FantasyGold Core Library
=======

A pure and powerful JavaScript FantasyGold library.


## Get Started

```
npm install fantasygoldcore-lib
```

```
bower install fantasygoldcore-lib
```

## Security

We're using fantasygoldcore-lib in production, but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.



## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. 

## Building the Browser Bundle

To build a fantasygoldcore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `fantasygoldcore-lib.js` and `fantasygoldcore-lib.min.js`.

## Development & Tests

```sh
git clone https://github.com/fantasygold/fantasygoldcore-lib
cd fantasygoldcore-lib
npm install
```

Run all the tests:

```sh
gulp test
```

You can also run just the Node.js tests with `gulp test:node`, just the browser tests with `gulp test:browser`
or create a test coverage report (you can open `coverage/lcov-report/index.html` to visualize it) with `gulp coverage`.

## License

