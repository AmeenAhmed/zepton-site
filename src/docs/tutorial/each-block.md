To render a list of elements use the `$each` block. The each block takes an array as the first
parameter and a function which returns an array of nodes.

```javascript
$each(state.list, (item, index) => [
  $('li', item())
])
```

Don't forget that the item and index parameters passed to the block function are functions to preserve
reactivity.
