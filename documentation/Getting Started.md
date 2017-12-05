# Getting Started

There's a few easy things you have to do to get started on your child module.

1. Go to the [Github repository for the child template](https://github.com/byuitechops/child-template).

2. Download the repository **as a zip file** by pressing the "Clone or Download" button (or just click [this](https://github.com/byuitechops/child-template/archive/master.zip)).

3. Unzip it to where you want your child module repository to live on your computer.

4. Navigate to the unzipped child module repository in the console.

5. Run `npm install`.

6. After its done, Run `npm start -- update d2l`. It downloads the current D2L gauntlet courses to your child module. You'll use this command to update them as needed. They are ignored by git. You will need to run this after running 'npm update' whenever you update your packages.

7. Open `package.json` in your editor. Change fields as needed (i.e. "name" should be the name of your child module). **Note**: You *must* fill out the "childType" field with either "preImport" or "postImport." Talk to Zach or Daniel if you do not know which to put.

8. Go to [Github](https://github.com/byuitechops) and create a new repository. Name it whatever you named your child module in it's `package.json`. Use all lower-case letters separated by hyphens (ex. "d2l-pages-search").

9. Open `.gitignore` in your editor and add `documentation/` and to the list. It is not ignored so it will be available when you download the template, but we don't want this on every child module.

10. Follow the instructions listed in the new repository on Github to push your child module to it.

11. Open `main.js` in your editor and go ham. `main.js` is where your child module code will live.

## The Commands You Need To know

**`npm start`** : This command runs your child module in the child development environment.

All that means is that it provides everything your module needs to run. For `preImport` modules, it gives them a course object built from the Gauntlet D2L courses you downloaded earlier with `npm start -- update d2l`. It also allows you to use different functions, like `course.success()` during development. And it gives you a valid course, so you can see if your module is actually working...

For `postImport` modules, it creates a clone of the Canvas Gauntlet and runs your child module on it. That way you don't make any actual changes to the pristine gauntlet on Canvas. It does mean running `npm start` or `npm test` may take a bit longer.

**`npm test`** : Runs your module against *all four* gauntlets. It includes whatever tap tests you've written in your `/Tests` folder as well. If you just want to see if your module even runs, use `npm start`. If you've finished writing it and want to test it, use `npm test`.
