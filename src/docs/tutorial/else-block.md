The previous example could be better written with an `$else` block. The $else block is chained with
the `$if` block.

```javascript
  $if(_ => !state.isActive, _ => [
    $('button', 'Activate', { $click: toggle }),
  ]).$else(_ => [
    $('button', 'Deactivate', { $click: toggle })
  ])
```
