# output

The output of Henris is completely adjustable. From full output to nothing where you can just use all mixins and functions

#### full

```scss
$output-full: true;
@import "~henris";
```

#### Minimum

```scss
$output-css: false;
@import "~henris";
```

or

```scss
@import "~henris/ext";
```

### Overrule

All settings which are set can be overruled.

Overrule the setting before the @import of henris like:

```scss
$output: output-define([settingname], [value: true or false]);

// example:
$output: output-define(button, true);
```

#### parent settings

Output is being overruled by its parent setting. Parent settings are the settings before the dash (-).

For example:

When button-icons is true, but button is not.

```scss
$output: output-define(button, false);
$output: output-define(button-icons, true);

.element {
	width: 10px;
	@if output(button-icons) {
		width: 20px;
	}
}

// results:
.element {
	width: 10px;
}
```

When button-icons is true and button is also true.

```scss
$output: output-define(button, true);
$output: output-define(button-icons, true);

.element {
	width: 10px;
	@if output(button-icons) {
		width: 20px;
	}
}

// results:
.element {
	width: 20px;
}
```

when button-icons is false and button is true.

```scss
$output: output-define(button, true);
$output: output-define(button-icons, true);

.element {
	width: 10px;
	@if output(button-icons) {
		width: 20px;
	}
}

// results:
.element {
	width: 10px;
}
```

### options

<table v-for="list in outputs.output">
    <tr>
        <th>Name</th>
        <th>Variable</th>
        <th>Value</th>
    </tr>
    <tr  v-for="key,value in list">
        <td>{{value}}</td>
        <td><code>$output-{{value}}</code></td>
        <td>{{key}}</td>
    </tr>
</table>

<script>
import outputData from '../../../data/output.json';

export default{
    data(){
        return{
            outputs: outputData
        }
    }
}

</script>
