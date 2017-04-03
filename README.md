# jQuery Slider Menu

> Tired of those standard click ‘n drop menus? Need something with a little more pazazz? Yes & yes! Here’s the answer to your prayers, the jQuery Slider Menu.

**If you're viewing this at https://github.com/bmarshall511/slider-menu.jquery.js, you're reading the documentation for the master branch.
[View documentation for the latest release.](https://github.com/bmarshall511/slider-menu.jquery.js/tree/latest#readme)**

## Installation

### Direct download

Download the script [here](https://github.com/bmarshall511/slider-menu.jquery.js/archive/master.zip) and include it (unless you are packaging scripts somehow else):

```html
<script src="/path/to/slider-menu.jquery.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

### Package Managers

jQuery Slider Menu supports [npm](https://www.npmjs.com/package/slider-menu).

## Basic Usage

Transform a list menu into a slider menu:

```javascript
$( '.my-menu' ).sliderMenu();
```

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)

## Security

For vulnerability reports, send an e-mail to `me at benmarshall dot me`

## Manual release steps

* Increment the "version" attribute of `package.json`
* Increment the version number in the `src/slider-menu.jquery.js` file
* Commit with the message "Release version x.x.x"
* Create version tag in git
* Create a github release and upload the minified file
* Change the `latest` tag pointer to the latest commit
  * `git tag -f latest`
  * `git push <remote> :refs/tags/latest`
  * `git push origin master --tags`
* Release on npm

## Authors

* [Ben Marshall](https://github.com/bmarshall511)
* And awesome [contributors](https://github.com/bmarshall511/slider-menu.jquery.js/graphs/contributors)
