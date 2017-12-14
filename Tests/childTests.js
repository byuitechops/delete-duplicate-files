/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

function g1Tests(course, callback) {

    tap.test('Some async stuff', (childTest) => {
        asyncLib.each(course.info.usedFiles, (file, asyncEachCb) => {
            canvas.get(`/api/v1/courses/${course.info.canvasOU}/files?search_term=${file}`, (err, results) => {
                if (err) {
                    console.error(err);
                    asyncEachCb(true);
                } else {
                    var exists = false;
                    if (results) {
                        exists = true;
                    }
                    if (exists) console.log(`TEST: ${file} still exists in canvas.`);
                    childTest.equal(false, exists);
                    asyncEachCb(null);
                }
            });
        }, err => {
            if (err) console.error(err);
            childTest.end();
            callback(null, course);
        });
    });

    // Tap tests for Gauntlet 1 go here
}

module.exports = [{
    gauntlet: 1,
    tests: g1Tests
}, ];
