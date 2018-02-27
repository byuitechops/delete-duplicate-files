# Delete Duplicate Files
### Package Name: delete-duplicate-files
### Child Type: "postImport"
### *Platform*: All
### *Required*: Recommended

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions.

## Purpose
When a course is imported into canvas from D2L, it interprets the "Content View" page and the actual HTML page in the D2L export as separate items, even though they are the same thing in D2L. Canvas creates a "Page" for the content view, using the HTML from the file, and then adds the HTML file into the course files. Since they are not linked in Canvas, it leaves duplicates in the course. One is in Pages, and the other is in Files. This child module removes the duplicates in Files.

## How to Install
```
npm install delete-duplicate-files
```

## Run Requirements
This child module requires the following fields in the course.info object:
* `canvasOU`
* `usedFiles`

`usedFiles` is created in [files-find-used-content](https://github.com/byuitechops/files-find-used-content), which MUST run before this child module.

## Options
None

## Outputs
None

## Process
This child module builds off of `files-find-used-content` to determine what html files inside of the new canvas course can be deleted. It takes the following steps:

1. Retrieve Files from new canvas course
2. Loop through the files
3. If a file is *not* included in the "Unused Files" array, it is removed from Files
4. If it is included in the "Unused Files" array, it is not removed

## Log Categories
Categories used in logging data in this module:
- Deleted Canvas Files

## Requirements
Remove duplicate HTML files where they already exist in Pages in Canvas. Canvas creates a Page for each content view in Brightspace, but also creates a duplicate HTML file for each course file. 