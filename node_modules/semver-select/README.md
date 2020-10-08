# semver-select.js

# Select an attribute of an object based on semver versioning

## Current status

[![NPM version](https://img.shields.io/npm/v/semver-select.svg)](https://www.npmjs.com/package/semver-select)
[![Build Status](https://img.shields.io/travis/overlookmotel/semver-select/master.svg)](http://travis-ci.org/overlookmotel/semver-select)
[![Dependency Status](https://img.shields.io/david/overlookmotel/semver-select.svg)](https://david-dm.org/overlookmotel/semver-select)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/semver-select.svg)](https://david-dm.org/overlookmotel/semver-select)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/semver-select/master.svg)](https://coveralls.io/r/overlookmotel/semver-select)

API is stable. All features tested and working.

## What's it for

A few useful tools for when you need to select a function or other variable based on a [semver](https://www.npmjs.com/package/semver) version.

For example, if you are writing an app which interacts with an API which needs a different calling signature depending on it's version, you can use this to choose a function that implements the right interface for that API version.

## Usage

### `semverSelect(version, choices)`

Takes a list of choices as an object with semver match strings as the object's attributes.

Loops through `choice`'s attributes and returns the first matching result.
Returns `undefined` if no match found.

```js
var semverSelect = require('semver-select');

var fns = {
    '^1.0.0': function(in) { return 'v1' },
    '^2.0.0': function(in) { return 'v2' },
    '*': function(in) { return 'other' }
};

semverSelect('1.0.2', fns)(); // returns 'v1'
semverSelect('2.3.8', fns)(); // returns 'v2'
semverSelect('4.0.0', fns)(); // returns 'other'
```

### `semverSelect.object(version, choicesObject)`

Takes an object and maps the values of attributes to the semver-chosen choice.

```js
semverSelect('2.3.8', {
	monkey: {
		'^1.0.0': 'v1',
        '1.0.0 - 2.x.x': 'v2',
        '*': 'other'
	},
	dinosaur: {
		'^1.0.0': 'ver1',
		'^2.0.0': 'ver2'
	}
}); // returns { monkey: 'v2', dinosaur: 'ver2' }
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/semver-select/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
