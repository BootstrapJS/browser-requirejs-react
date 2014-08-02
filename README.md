# ReactJs Browser Project Seed

This repository contains a basic project setup, which I use to quickly setup
new Reactjs projects for myself.

## Used Features

The current seed utilizes the following features/projects:

- [React](http://facebook.github.io/react/)
- [Grunt](http://gruntjs.com)
- [require.js](http://requirejs.org/)
- [amdclean](http://gregfranko.com/amdclean/)
- [karma-runner](http://karma-runner.github.io/)
- [jshint](http://www.jshint.com/)
- [npm](http://npmjs.org)

## Initialization

To initialize a new project from the seed the following basic steps are
required:

1. Copy a recent checkout to your new projects directory
2. Remove the `.git` folder
3. Replace the `name`, `description` and `author` inside the `package.json` with
   information about your new project
4. Run `npm install`
5. (Run `bower install`)
5. Run `grunt symlink:www`

## Development

The following basic rules apply during development:

- JavaScript sourcecode is stored under `Library`
- All files containing *jsx* need to be suffixed with `.jsx`. They need to be 
  loaded as a dependency within requirejs using the `jsx!` loader 
  (eg. `jsx!Components/SomeComponent`)
- All other *web* content (html, css, images, ...) is stored under `Assets`
- `grunt symlink:www` takes care of creating a `Public` directory which contains
  all the needed file structures linked for dynamic loading during development
    - `Public/index_dev.html` may be opened to test the app during development. It
      automatically bootstraps the application using the `main.js` module stored
      under `Library`. All dependencies are loaded dynamically
    - Use `grunt server` to startup a correctly configured webserver to load the development
      files
- `grunt build` creates a combined and minified build, which is stored under
  `Package`. 
    - Opening `index.html` inside the `Package` folder loads the combined
      application
- `Library/require.config.js` handles all the *require.js* configuration for
  development and production builds
- `Library/require.config.build.js` allows certain aspects of the configuration
  to be specifically overwritten for builds. Like for example using a preminified
  React.js version.
- Tests are stored under `Specifications`
    - They are named `*.spec.js`
    - The used framework is Jasmine
    - Tests are supposed to be require-modules as well
- Test fixtures are stored under `Fixtures`
    - They are automatically loaded and made available under
      `window.__html__["Fixtures/YOUR_FIXTURE_NAME.html"]`
- All Grunt related configuration can be found split up in separate files under
  the `Build Support` directory.

## Further Read

I wrote a more detailed blog post about this repository, which can be found on my [personal blog](http://www.westhoffswelt.de/blog/2014/2/21/how-i-seed-a-new-javascript-project). It may be outdated however, with regards to the current state of the seed repository.
