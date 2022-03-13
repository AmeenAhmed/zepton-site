Events can be attached to a node in Zepton using event properties. The event properties start
with a `$` sign. for eg: `$click`.

```javascript
$('button', 'Click me!', {
  $click: ev => state.timesClicked++
})
```
