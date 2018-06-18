# Grid

## grid features

<div class="row small-full medium-half xlarge-third">
<div class="column">

![An image](/media/img/icon_columns-in-percentages.svg)

#### Columns in percentage

The grid is based on 24 columns. Most of layouting can be refered to the grid and sizes are specified in "grid". For example; a padding of 2 grid means ((100 / 24) \* 2 ) = 8.333% from the

</div>
<div class="column">

![grid sizes](/media/img/icon_grid-sizes.svg)

#### Grid sizes

Because the whole design is based on a full width, we can calculate in grid sizes. This means sizes can be set width the grid function: `.element{ padding: grid(2); }` In this case grid will be calculated to viewport widths and get compiled to: `.element{ padding: 8.333vw; }`

</div>
<div class="column">

![classes](/media/img/icon_classes.svg)

#### Classes

The layout is simple. We build rows `.row` with children `.column`

`<div class="row">

<div class="column"></div>
</div>
`

</div>
</div>

<div class="row small-full medium-half xlarge-third">
<div class="column">

![responsive](/media/img/icon_responsive.svg)

#### Responsive

To create responsive widths on the columns, there are different classes to be used on the columns.

In an ideal world we start by declaring the small width. This is the width which will be set for everything from small.

`<div class="column small-half"></div>`

</div>
<div class="column">

![breakpoint classes](/media/img/icon_breakpoint-classes.svg)

#### Breakpoint classes

Extra classes can be added to change values on a breakpoint and up.

`<div class="column small-half medium-quarter large-fifth"></div>`

</div>
<div class="column">

![breakpoint only](/media/img/icon_breakpoint-only.svg)

#### Specific for Breakpoint classes

Adding `-only` to the class, will use this specified width only on that specific size.

`<div class="column small-half medium-only-quarter"></div>`

This will make the column half the row size for all breakpoints exept for "medium"

</div>
</div>

### Default Settings

| Variable             | Default value                                                                                                                                                                                                    | Description                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$grid-columns`      | 24                                                                                                                                                                                                               | Amount of columns                                                                                                                                                                          |
| `$grid-design-width` | 1920px                                                                                                                                                                                                           | Base design width. Used for converting rem to grid size and min/max grid size                                                                                                              |
| `$grid-row-width`    | 4096px                                                                                                                                                                                                           | Maximum row width, will be set as max-width for rows.                                                                                                                                      |
| `$grid-breakpoints`  | small : 750 <br> medium : 960<br>large : 1280<br>xlarge : 1920<br>xxlarge : 9999                                                                                                                                 | Breakpoints used for the grid. All classes will be automatically generated based on these names and sizes. **Do not add classes**, this can break many things, changing values is allowed. |
| `$grid-parts`        | 1/1 : full<br>1/2 : half<br>1/3 : third<br>2/3 : two-third<br>1/4 : quarter<br>3/4 : three-quarter<br>1/5 : fifth<br>2/5 : two-fifth<br>3/5 : three-fifth<br>4/5 : four-fifth<br>1/6 : sixth<br>5/6 : five-sixth | Extra breakpoints automatically generates percentages. More can be added easily.                                                                                                           |

## Basic numeral columns

Using the numeral columns can be in two ways. The width of the columns can be specified in multiple ways;

<div class="row small-full medium-half xlarge-third">
<div class="column">

![class on row](/media/img/icon_column-on-row.svg)

#### On the Row

The column width can be specified directly on the row. This will set the width for all direct children with the class `.column`. This is done to simplify rows with equal columns.

</div>
<div class="column">

![class on column](/media/img/icon_class-on-column.svg)

#### On the column

The column width can be specified on each `.column` in a `.row` in order to create a layout with different widths.

</div>
<div class="column">

![class on both](/media/img/icon_class-on-both.svg)

#### On both

When the width is specified on the row. The widths of a specific `.column` can be overriden by setting the width on the column itself.

</div></div>

## examples

### Standard columns (numeral)

<div class="example">
<div class="row small-1"><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div><div class="column">1</div></div><div class="row small-2"><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div><div class="column">2</div></div><div class="row small-3"><div class="column">3</div><div class="column">3</div><div class="column">3</div><div class="column">3</div><div class="column">3</div><div class="column">3</div><div class="column">3</div><div class="column">3</div></div><div class="row small-4"><div class="column">4</div><div class="column">4</div><div class="column">4</div><div class="column">4</div><div class="column">4</div><div class="column">4</div></div><div class="row small-5"><div class="column">5</div><div class="column">5</div><div class="column">5</div><div class="column">5</div></div><div class="row small-6"><div class="column">6</div><div class="column">6</div><div class="column">6</div><div class="column">6</div></div><div class="row small-7"><div class="column">7</div><div class="column">7</div><div class="column">7</div></div><div class="row small-8"><div class="column">8</div><div class="column">8</div><div class="column">8</div></div><div class="row small-9"><div class="column">9</div><div class="column">9</div></div><div class="row small-10"><div class="column">10</div><div class="column">10</div></div><div class="row small-11"><div class="column">11</div><div class="column">11</div></div><div class="row small-12"><div class="column">12</div><div class="column">12</div></div><div class="row small-13"><div class="column">13</div></div><div class="row small-14"><div class="column">14</div></div><div class="row small-15"><div class="column">15</div></div><div class="row small-16"><div class="column">16</div></div><div class="row small-17"><div class="column">17</div></div><div class="row small-18"><div class="column">18</div></div><div class="row small-19"><div class="column">19</div></div><div class="row small-20"><div class="column">20</div></div><div class="row small-21"><div class="column">21</div></div><div class="row small-22"><div class="column">22</div></div><div class="row small-23"><div class="column">23</div></div><div class="row small-24"><div class="column">24</div></div>
</div>

### Combine columns

<div class="example">
<div class="row">
    <div class="column small-12"> 12</div>
    <div class="column small-3"> 3</div>
    <div class="column small-3"> 3</div>
    <div class="column small-2"> 2</div>
    <div class="column small-1"> 1</div>
</div>
</div>

### Partial columns

<div class="example">
<div class="row small-full"><div class="column">full</div></div><div class="row small-half"><div class="column">half</div><div class="column">half</div></div><div class="row small-third"><div class="column">third</div><div class="column">third</div><div class="column">third</div></div><div class="row small-quarter"><div class="column">quarter</div><div class="column">quarter</div><div class="column">quarter</div><div class="column">quarter</div></div><div class="row small-fifth"><div class="column">fifth</div><div class="column">fifth</div><div class="column">fifth</div><div class="column">fifth</div><div class="column">fifth</div></div><div class="row small-sixth"><div class="column">sixth</div><div class="column">sixth</div><div class="column">sixth</div><div class="column">sixth</div><div class="column">sixth</div><div class="column">sixth</div></div>
</div>

### Combine partials

<div class="example">
<div class="row">
    <div class="column small-half">half</div>
    <div class="column small-quarter">quarter</div>
    <div class="column small-fifth">fifth</div>
</div>
</div>
