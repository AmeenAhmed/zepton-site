When you insert elements into an array the `$each` block always adds elements to the end and updates
all the other values in the list. Consider this example where when you add elements to the start of
the array still the bottom one gets animated because the element is added at the end.

To avoid this and only affect the inserted element a unique is required to know which element is
being affected.

a unique key is provided to the `$each` function as a function as the second argument. This function
sends the list item as the argument and you have to return the key associated with that item.

```javascript
$each(state.list, item => item, (item, index) => [
  $('li', _ => item(), { transition: { fn: fade } })
]);
```

Once the key is provided the first element in the list correctly animated.
