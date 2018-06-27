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
