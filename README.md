# jQuery Slider Menu [![npm version](https://badge.fury.io/js/slider-menu.svg)](https://badge.fury.io/js/slider-menu)

[![Code Climate](https://codeclimate.com/github/bmarshall511/slider-menu.jquery.js.svg)](https://codeclimate.com/github/bmarshall511/slider-menu.jquery.js)
[![Build Status](https://travis-ci.org/bmarshall511/slider-menu.jquery.js.svg?branch=master)](https://travis-ci.org/bmarshall511/slider-menu.jquery.js)
[![dependencies Status](https://david-dm.org/bmarshall511/slider-menu.jquery.js/status.svg)](https://david-dm.org/bmarshall511/slider-menu.jquery.js)
[![devDependencies Status](https://david-dm.org/bmarshall511/slider-menu.jquery.js/dev-status.svg)](https://david-dm.org/bmarshall511/slider-menu.jquery.js?type=dev)
[![Join the chat at https://gitter.im/slider-menu-jquery-js/Lobby](https://badges.gitter.im/slider-menu-jquery-js/Lobby.svg)](https://gitter.im/slider-menu-jquery-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Gratipay User](https://img.shields.io/gratipay/user/bmarshall511.svg)](https://gratipay.com/~bmarshall511/)
[![Beerpay](https://beerpay.io/bmarshall511/slider-menu.jquery.js/badge.svg?style=flat)](https://beerpay.io/bmarshall511/slider-menu.jquery.js)
[![Beerpay](https://beerpay.io/bmarshall511/slider-menu.jquery.js/make-wish.svg?style=flat)](https://beerpay.io/bmarshall511/slider-menu.jquery.js?focus=wish)

> Tired of those standard click ‘n drop menus? Need something with a little more pazazz? Yes & yes! Here’s the answer to your prayers, the jQuery Slider Menu.

**If you're viewing this at https://github.com/bmarshall511/slider-menu.jquery.js, you're reading the documentation for the master branch.
[View documentation for the latest release.](https://github.com/bmarshall511/slider-menu.jquery.js/tree/latest#readme)**

## Installation

### Direct download

Download the script [here](https://github.com/bmarshall511/slider-menu.jquery.js/archive/latest.zip) and include it (unless you are packaging scripts somehow else):

```html
<link href="/path/to/slider-menu.jquery.css" rel="stylesheet">
<link href="/path/to/slider-menu.theme.jquery.css" rel="stylesheet">
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

// Change the slide back link.
$( '.my-menu' ).sliderMenu({
  back: '<span class="slider-menu__text">Back</span>'
});
```

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md).

## Security

For vulnerability reports, send an e-mail to `me at benmarshall dot me`.

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
