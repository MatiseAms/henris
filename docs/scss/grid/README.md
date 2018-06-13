# Grid

[![Node version](/images/icon_columns-in-percentages.svg)]

#### Columns in percentage

The grid is based on 24 columns. Most of layouting can be refered to the grid and sizes are specified in "grid". For example; a padding of 2 grid means ((100 / 24) \* 2 ) = 8.333% from the

img(src="/images/icon_grid-sizes.svg",alt="grid sizes")

#### Grid sizes

Because the whole design is based on a full width, we can calculate in grid sizes. This means sizes can be set width the grid function: `.element{ padding: grid(2); }` In this case grid will be calculated to viewport widths and get compiled to: `.element{ padding: 8.333vw; }`

#### Classes

[(src="/images/icon_classes.svg",alt="classes")]

The layout is simple. We build rows `.row` with children `.column`

```html
<div class="row">
    <div class="column example"></div>
</div>
```

img(src="/images/icon_responsive.svg",alt="responsive")

#### Responsive

To create responsive widths on the columns, there are different classes to be used on the columns.

In an ideal world we start by declaring the small width. This is the width which will be set for everything from small.

```html
	<div class="column small-half"></div>
```

img(src="/images/icon_breakpoint-classes.svg",alt="breakpoint classes")

#### Breakpoint classes

Extra classes can be added to change values on a breakpoint and up.

```html
<div class="column small-half medium-quarter large-fifth"></div>
```

img(src="/images/icon_breakpoint-only.svg",alt="breakpoint only")

#### Specific for Breakpoint classes

Adding `-only` to the class, will use this specified width only on that specific size.

```html
<div class="column small-half medium-only-quarter"></div>
```

This will make the column half the row size for all breakpoints exept for "medium"

### Default Settings

| Variable             | Default value                                                                                                                                                                                                    | Description                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$grid-columns`      | 24                                                                                                                                                                                                               | Amount of columns                                                                                                                                                                          |
| `$grid-design-width` | 1920px                                                                                                                                                                                                           | Base design width. Used for converting rem to grid size and min/max grid size                                                                                                              |
| `$grid-row-width`    | 4096px                                                                                                                                                                                                           | Maximum row width, will be set as max-width for rows.                                                                                                                                      |
| `$grid-breakpoints`  | small : 750 <br> medium : 960<br>large : 1280<br>xlarge : 1920<br>xxlarge : 9999                                                                                                                                 | Breakpoints used for the grid. All classes will be automatically generated based on these names and sizes. **Do not add classes**, this can break many things, changing values is allowed. |
| `$grid-parts`        | 1/1 : full<br>1/2 : half<br>1/3 : third<br>2/3 : two-third<br>1/4 : quarter<br>3/4 : three-quarter<br>1/5 : fifth<br>2/5 : two-fifth<br>3/5 : three-fifth<br>4/5 : four-fifth<br>1/6 : sixth<br>5/6 : five-sixth | Extra breakpoints automatically generates percentages. More can be added easily.                                                                                                           |

### Basic numeral columns

Using the numeral columns can be in two ways. The width of the columns can be specified in multiple ways;

img(src="/images/icon_column-on-row.svg",alt="class on row")

#### On the Row

The column width can be specified directly on the row. This will set the width for all direct children with the class `.column`. This is done to simplify rows with equal columns.

img(src="/images/icon_class-on-column.svg",alt="class on column")

#### On the column

The column width can be specified on each `.column in a`.row in order to create a layout with different widths.
img(src="/images/icon_class-on-both.svg",alt="class on both")

#### On both

When the width is specified on the row. The widths of a specific `.column` can be overriden by setting the width on the column itself.

### Standard columns (numeral)

<div data-v-77c197b6="" class="row example small-1"><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div><div data-v-77c197b6="" class="column example">1</div></div><div data-v-77c197b6="" class="row example small-2"><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div><div data-v-77c197b6="" class="column example">2</div></div><div data-v-77c197b6="" class="row example small-3"><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div><div data-v-77c197b6="" class="column example">3</div></div><div data-v-77c197b6="" class="row example small-4"><div data-v-77c197b6="" class="column example">4</div><div data-v-77c197b6="" class="column example">4</div><div data-v-77c197b6="" class="column example">4</div><div data-v-77c197b6="" class="column example">4</div><div data-v-77c197b6="" class="column example">4</div><div data-v-77c197b6="" class="column example">4</div></div><div data-v-77c197b6="" class="row example small-5"><div data-v-77c197b6="" class="column example">5</div><div data-v-77c197b6="" class="column example">5</div><div data-v-77c197b6="" class="column example">5</div><div data-v-77c197b6="" class="column example">5</div></div><div data-v-77c197b6="" class="row example small-6"><div data-v-77c197b6="" class="column example">6</div><div data-v-77c197b6="" class="column example">6</div><div data-v-77c197b6="" class="column example">6</div><div data-v-77c197b6="" class="column example">6</div></div><div data-v-77c197b6="" class="row example small-7"><div data-v-77c197b6="" class="column example">7</div><div data-v-77c197b6="" class="column example">7</div><div data-v-77c197b6="" class="column example">7</div></div><div data-v-77c197b6="" class="row example small-8"><div data-v-77c197b6="" class="column example">8</div><div data-v-77c197b6="" class="column example">8</div><div data-v-77c197b6="" class="column example">8</div></div><div data-v-77c197b6="" class="row example small-9"><div data-v-77c197b6="" class="column example">9</div><div data-v-77c197b6="" class="column example">9</div></div><div data-v-77c197b6="" class="row example small-10"><div data-v-77c197b6="" class="column example">10</div><div data-v-77c197b6="" class="column example">10</div></div><div data-v-77c197b6="" class="row example small-11"><div data-v-77c197b6="" class="column example">11</div><div data-v-77c197b6="" class="column example">11</div></div><div data-v-77c197b6="" class="row example small-12"><div data-v-77c197b6="" class="column example">12</div><div data-v-77c197b6="" class="column example">12</div></div><div data-v-77c197b6="" class="row example small-13"><div data-v-77c197b6="" class="column example">13</div></div><div data-v-77c197b6="" class="row example small-14"><div data-v-77c197b6="" class="column example">14</div></div><div data-v-77c197b6="" class="row example small-15"><div data-v-77c197b6="" class="column example">15</div></div><div data-v-77c197b6="" class="row example small-16"><div data-v-77c197b6="" class="column example">16</div></div><div data-v-77c197b6="" class="row example small-17"><div data-v-77c197b6="" class="column example">17</div></div><div data-v-77c197b6="" class="row example small-18"><div data-v-77c197b6="" class="column example">18</div></div><div data-v-77c197b6="" class="row example small-19"><div data-v-77c197b6="" class="column example">19</div></div><div data-v-77c197b6="" class="row example small-20"><div data-v-77c197b6="" class="column example">20</div></div><div data-v-77c197b6="" class="row example small-21"><div data-v-77c197b6="" class="column example">21</div></div><div data-v-77c197b6="" class="row example small-22"><div data-v-77c197b6="" class="column example">22</div></div><div data-v-77c197b6="" class="row example small-23"><div data-v-77c197b6="" class="column example">23</div></div><div data-v-77c197b6="" class="row example small-24"><div data-v-77c197b6="" class="column example">24</div></div>


### Combine columns

<div class="row example">
    <div class="column example small-12"> 12</div>
    <div class="column example small-3"> 3</div>
    <div class="column example small-3"> 3</div>
    <div class="column example small-2"> 2</div>
    <div class="column example small-1"> 1</div>
</div>

### Partial columns

<div data-v-77c197b6="" class="row example small-full"><div data-v-77c197b6="" class="column example">full</div></div><div data-v-77c197b6="" class="row example small-half"><div data-v-77c197b6="" class="column example">half</div><div data-v-77c197b6="" class="column example">half</div></div><div data-v-77c197b6="" class="row example small-third"><div data-v-77c197b6="" class="column example">third</div><div data-v-77c197b6="" class="column example">third</div><div data-v-77c197b6="" class="column example">third</div></div><div data-v-77c197b6="" class="row example small-quarter"><div data-v-77c197b6="" class="column example">quarter</div><div data-v-77c197b6="" class="column example">quarter</div><div data-v-77c197b6="" class="column example">quarter</div><div data-v-77c197b6="" class="column example">quarter</div></div><div data-v-77c197b6="" class="row example small-fifth"><div data-v-77c197b6="" class="column example">fifth</div><div data-v-77c197b6="" class="column example">fifth</div><div data-v-77c197b6="" class="column example">fifth</div><div data-v-77c197b6="" class="column example">fifth</div><div data-v-77c197b6="" class="column example">fifth</div></div><div data-v-77c197b6="" class="row example small-sixth"><div data-v-77c197b6="" class="column example">sixth</div><div data-v-77c197b6="" class="column example">sixth</div><div data-v-77c197b6="" class="column example">sixth</div><div data-v-77c197b6="" class="column example">sixth</div><div data-v-77c197b6="" class="column example">sixth</div><div data-v-77c197b6="" class="column example">sixth</div></div>

### Combine partials

<div class="row example">
    <div class="column example small-half"> half</div>
    <div class="column example small-quarter"> quarter</div>
    <div class="column example small-fifth"> fifth</div>
</div>
