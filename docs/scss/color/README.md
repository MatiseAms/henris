# Color

### the function `color(Red)`

The basic function has more than meets the eye. Essentially it outputs the color you want, taken from the current colorset.

#### arguments

| value    | the name of the color                                                |
| -------- | -------------------------------------------------------------------- |
| opacity  | the amount of opacity from 0 to 1. Default: 1                        |
| colorset | Search for the color in another defined colorset. Default: 'default' |

Simple

```scss
/* input: */
background-color: color(Red);
/* output: */
background-color: #eb0f33;
```

opacity

```scss
/* input: */
background-color: color(Red, 0.5);
/* output: */
background-color: rgba(235, 15, 51, 0.5);
```

colorset

```scss
/* input: */
background-color: color(Red, 1, "vibrant");
/* output: */
background-color: #fe5165;
```

### define another colorset

he basic function comes with a default colorset. This colorset can ben changed, extended or overwritten by another colorset. This example shows how to define another colorset.

```scss
/* Define the colorset before the import of @import 'svd-style' */
$default-color-set: "vibrant";
```

### Set a new custom colorset

A fully new colorset can be set also using the same way, instead of a string (name) for the $default-colorset, you pass a map. Make sure this map has atleast 'Black' and 'White' defined, otherwise the colorset will fall back to the default colorset defined in svd-style

Define the colorset before the import of @import 'henri'

```scss
$default-color-set: (
	"Black": #111111,
	"White": #f7f7f7,
	"myBlue": #181160,
	"fireRed": #ed1f35
);

/* output '@debug $colors' (after include of svd-style)
The full colorset is overwritten and all colors are added to the list and can be used in the color() function as color(Black) or color(myBlue); \*/

debug: (
	"Black": #111111,
	"White": #f7f7f7,
	"myBlue": #181160,
	"fireRed": #ed1f35
);
```

### Add custom colors to the default colorset.

Defining a full new colorset is not always the best options, sometimes you just want to add some colors or overwrite existing colors.

```scss
/* Create a new list and do this */
$custom-colors: (
	"myBlue": #181160,
	"fireRed": #ed1f35
);

/* output '@debug $colors' (after include of svd-style)
The myBlue and fireRed are added on the end of the list and can be used in the color() function as color(myBlue); */
debug: (
	"Black": #101010,
	"Dark": #303030,
	"White": #ffffff,
	"Offwhite": #f7f7f7,
	"Green": #10c565,
	"Blue": #1eb3e0,
	"Red": #eb0f33,
	"Brown": #aa834f,
	"Yellow": #f5c505,
	"Orange": #f6790b,
	"Pink": #ca1387,
	"Purple": #7329b1,
	"Turquoise": #3feac3,
	"myBlue": #181160,
	"fireRed": #ed1f35
);
```
