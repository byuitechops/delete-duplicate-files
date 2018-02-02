/*eslint-env node, es6*/

/* Module Description */
/* Deletes duplicate files for used pages in Canvas */

/* Put dependencies here */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /* Retrieve all HTML files from the course */
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/files?search_term=html`, (err, canvasFiles) => {
        if (err) {
            course.error(err)
            stepCallback(null);
        } else {
            /* Iterate through each canvas html file and check if it is used or not */
            asyncLib.each(canvasFiles, (canvasFile, eachCb) => {
                /* Is it used in the course? If yes - delete it */
                if (course.info.usedFiles.includes(canvasFile.display_name)) {
                    canvas.delete(`/api/v1/files/${canvasFile.id}`, (deleteErr) => {
                        if (deleteErr) {
                            course.error(new Error(`${canvasFile.display_name} listed as a used file, but the tool failed to delete its duplicate. Does it exist in canvas?`));
                            eachCb(null);
                        } else {
                            course.log('Deleted Canvas Files', {
                                'Name': canvasFile.display_name,
                                'ID': canvasFile.id
                            });
                            eachCb(null);
                        }
                    });
                } else {
                    eachCb(null);
                }
            }, (err) => {
                if (err) {
                    course.error(err);
                    stepCallback(null, course);
                } else {
                    course.message('All duplicate files have been deleted');
                    stepCallback(null, course);
                }
            });
        }
    });


};
