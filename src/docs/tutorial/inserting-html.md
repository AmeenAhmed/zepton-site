When strings are passed to node functions they become text. If you want to insert HTML you have to
use the `$html` function.

```javascript
const h1 = '<h1>Hello world!</h1>';
const template = $('.view',
  $html(h1)
);
```
