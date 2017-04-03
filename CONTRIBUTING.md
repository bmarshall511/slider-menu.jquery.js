## Issues

- Report issues or feature requests on [GitHub Issues](https://github.com/bmarshall511/slider-menu.jquery.js/issues).
- If reporting a bug, please add a [simplified example](http://sscce.org/).

## Pull requests
- Create a new topic branch for every separate change you make.
- Create a test case if you are fixing a bug or implementing an important feature.
- Make sure the build runs successfully.

## Development

### Tools
We use the following tools for development:

- [NodeJS](http://nodejs.org/download/) required to run grunt.
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) for task management.

### Getting started
Install [NodeJS](http://nodejs.org/).
Install globally gulp using the following command:

    $ npm install -g gulp

Browse to the project root directory and install the dev dependencies:

    $ npm install -d

To execute the build and tests run the following command in the root of the project:

    $ gulp

You should see a green message in the console:

    Done, without errors.


### Automatic build
You can build automatically after a file change using the following command:

    $ gulp watch
