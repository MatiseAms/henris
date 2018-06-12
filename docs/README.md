<center><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 200" enable-background="new 0 0 400 200" xml:space="preserve" width="100">
<path id="XMLID_11_" d="M309.202,21.653c-33.601,0-63.601,20.398-75.604,49.197c-9.603-8.402-20.398-13.204-33.601-13.204 s-23.999,4.801-32.401,13.204c-13.204-28.8-42.003-49.197-75.604-49.197C45.202,21.653,8,58.847,8,104.451 s37.202,82.798,82.798,82.798s82.806-37.194,82.806-82.798c0-14.404,10.803-25.199,25.199-25.199 c14.404,0,25.199,10.803,25.199,25.199c0,45.604,37.202,82.798,82.798,82.798S392,150.056,392,104.451 S354.806,21.653,309.202,21.653z M90.798,165.652c-33.601,0-61.201-27.599-61.201-61.201s27.599-61.201,61.201-61.201	s61.201,27.599,61.201,61.201S125.6,165.652,90.798,165.652z M309.202,165.652c-33.601,0-61.201-27.599-61.201-61.201 s27.599-61.201,61.201-61.201s61.201,27.599,61.201,61.201S342.803,165.652,309.202,165.652z"></path>
</svg></center>

# Henri's

Another SCSS framework to make css development a lot faster and easier.

[![Node version](https://img.shields.io/github/issues-raw/matiseAms/henris.svg?style=-square)](https://github.com/matiseAms/henris/issues)
[![Node version](https://img.shields.io/npm/l/henris.svg?style=-square)](https://github.com/MatiseAms/henris/blob/master/LICENSE.MD)
[![Node version](https://img.shields.io/david/matiseAms/henris.svg?style=-square)](https://github.com/matiseAms/henris/)
[![Node version](https://img.shields.io/npm/v/henris.svg?style=-square)](https://www.npmjs.com/package/henris)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Installation is simple, just npm install the package and go!

**NPM**

Install the package using npm

```bash
npm install henris
```

or

```bash
yarn add henris
```

**Import in project**

Import the file into you main scss file.

```
@import 'henris';
```

Or in another file where you don't want the full output, just the functions.

```
@import 'henris/ext';
```

## Running the tests

Tests will check the main functionalities of the package. Install the package locally and run

```bash
npm run test
```

### And coding style tests

All code is beautyfied using [Prettier](https://www.prettier.io)

## Deployment

Add additional notes about how to deploy this on a live system

## Browser Support

Henri's lma uses autoprefixer to make (most) Flexbox features compatible with earlier browser versions. According to Can I use, Henri's is compatible with recent versions of:

- Safari
- Chrome
- Firefox
- Opera
- Edge
- Internet Explorer (10+) is only partially supported.

## Built With

- [Node-sass](https://sass-lang.com/) - Sass language compiler
- [Postcss](https://postcss.org/) - Autoprefixer and other functions
- [webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator) - Library used for converting icons to fonts
- [True](http://oddbird.net/true/) - Sass testing
- [Vuepress](https://vuepress.vuejs.org) - For the docs

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Sil van Diepen** - _Matise_ - [Matise](https://www.matise.nl)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
