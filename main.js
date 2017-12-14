/*eslint-env node, es6*/

/* Module Description */
/* Deletes duplicate files for used pages in Canvas */

/* Put dependencies here */
const canvas = require('canvas-wrapper');
const path = require('path');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {
    course.addModuleReport('delete-duplicate-files');

    canvas.get(`/api/v1/courses/${course.info.canvasOU}/files?search_term=html`, (err, canvasFiles) => {
        if (err) course.throwErr('delete-duplicate-files', err);
        else {
            asyncLib.each(canvasFiles, (canvasFile, eachCb) => {
                if (usedFileNames.includes(canvasFile.display_name)) {
                    canvas.delete(`/api/v1/files/${canvasFile.id}`, (deleteErr) => {
                        if (deleteErr) course.throwErr('delete-duplicate-files', `${canvasFile.display_name} listed as a used file, but the tool failed to delete its duplicate. Does it exist in canvas?`);
                        else {
                            course.success('delete-duplicate-files', `${canvasFile.display_name} has been deleted from canvas files.`);
                            eachCb(null);
                        }
                    });
                }
            }, (err) => {
                if (err) course.throwErr('delete-duplicate-files', err);
                else {
                    course.success('delete-duplicate-files', `All duplicate files deleted.`);
                    stepCallback(null, course);
                }
            });
        }
    });


};
