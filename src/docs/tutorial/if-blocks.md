To conditionally render nodes use the `$if` function. It takes a function which returns the result
of the condition to be checked.

```javascript
$if(_ => state.isActive, _ => [
    $if(_ => !state.isActive, _ => [
      $('button', 'Activate', { $click: toggle }),
    ]),
    $if(_ => state.isActive, _ => [
      $('button', 'Deactivate', { $click: toggle })
    ])
])
```

to know more about the $if block go [here](/docs#conditional-rendering).
