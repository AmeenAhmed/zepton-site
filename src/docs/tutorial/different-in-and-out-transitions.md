You can define different transition functions for enter and exit animations. To acheive this, 
instead of using the transition property you can use in and out properties.

you can import two transitions like this,

```javascript
import { fadeLeft, fadeUp } from 'zepton/transitions';
```

and apply it using the `in` and `out` properties instead of `transition`,

```javascript
{ in: { fn: fadeLeft }, out: { fn: fadeUp } }
```



