/*eslint-env node, es6*/

/* Module Description */
/* Deletes duplicate files for used pages in Canvas */

/* Put dependencies here */
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    course.addModuleReport('delete-duplicate-files');

    canvas.get(`/api/v1/courses/${course.info.canvasOU}/files`, {}, (err, canvasFiles) => {
        if (err) course.throwErr('delete-duplicate-files', err);
        else {
            canvasFiles.forEach(canvasFile => {
                if (course.info.usedFiles.includes(canvasFile.display_name)) {
                    canvas.delete(`/api/v1/files/${canvasFile.id}`, (deleteErr) => {
                        if (deleteErr) course.throwErr('delete-duplicate-files', deleteErr);
                        else {
                            course.success('delete-duplicate-files', `${canvasFile.display_name} has been deleted from canvas files.`);
                        }
                    });
                }
            });
            stepCallback(null, course);
        }
    });


};
