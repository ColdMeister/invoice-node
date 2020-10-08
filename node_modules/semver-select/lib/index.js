// --------------------
// semver-select module
// --------------------

// modules
var semver = require('semver');

// exports
var semverSelect = function(version, choices) {
    for (var thisSemver in choices) {
        if (semver.satisfies(version, thisSemver)) return choices[thisSemver];
    }
};

semverSelect.object = function(version, obj) {
    var result = {};
    for (var name in obj) {
        result[name] = semverSelect(version, obj[name]);
    }
    return result;
};

module.exports = semverSelect;
