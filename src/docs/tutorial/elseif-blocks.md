You can provide multiple conditions to check using the else if blocks. The `$elseif` blocks are
chained as well. You can provide multiple $elseif blocks as well.

```javascript
$if(_ => count == 0, _ => [
  'Count is zero'
]).$elseif(_ => count < 0, _ => [
    'Count is negative'
]).$else(_ => [
  'Count is positive'
])
```
