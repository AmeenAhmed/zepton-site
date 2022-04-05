You can apply animations to elements when they are mounted or removed on conditional rendering 
using the transition property.

Zepton provides some predefined transitions which are imported like this,

```javascript
import { fadeDown } from 'zepton/transitions';
```

Transitions can be applied to the child elements of `$each`, `$if` or `$key` nodes.

just pass the `transition` property and pass it an object with `fn` as the transition function.

```javascript
{ transition: { fn: fadeDown } }
```


