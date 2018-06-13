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
