# typography

Font includes made easy..

### Include or define up to 4 fonts.

| Font           | Variable           |
| -------------- | ------------------ |
| 1<sup>st</sup> | `$font-primary`    |
| 2<sup>nd</sup> | `$font-secondary`  |
| 3<sup>rd</sup> | `$font-tertiary`   |
| 4<sup>th</sup> | `$font-quaternary` |

### options

| Property       | Default value                   | Example                           | Type    |
| -------------- | ------------------------------- | --------------------------------- | ------- |
| font-family \* | `null`                          | `"Graphik", sans-serif`           | string  |
| load           | `false`                         | `true`                            | boolean |
| weights        | `()`                            | `('light': 200, 'Regular': 400 )` | map     |
| path           | `"/fonts"`                      | `"/myPath/fonts"`                 | string  |
| files          | `"woff2", "woff", "ttf", "eot"` |                                   | list    |
| use            | `()`                            | `('h1','.title','blockquote')`    | list    |
| types          | `('normal')`                    | `('normal','italic')`             | list    |

_\* is required_

### example

```
$font-primary: (
  font-family: (
    Graphik,
    sans-serif
  ),
  load: true,
  weights: (
    "Light": 100,
    "Regular": 400,
    "Medium": 500,
    "Bold": 600,
    "Black": 800
  ),
  path: "/fonts",
  files: (
    "woff2",
    "woff",
    "ttf",
    "eot"
  ),
  use: (
    "h1",
    "h3",
    "h4",
    "span.text",
    "#section"
  ),
  types: (
      'normal',
      'italic'
  )
);
```

### notes

- Font weights need to be set in order to load fonts.
- Font weight names must be identical to actual file names.
- The first entry in font-family will be loaded when loaded is true.
- The space in a font-family name will be removed for the file name. `Helvetica Neue` will be `HelveticaNeue`
- Font includes uses the following syntax: _`fontFamily-fontWeightName.ttf`_
- When font-type 'italic' is added. Font includes will be as _`fontFamily-fontWeightNameItalic.ttf`_
