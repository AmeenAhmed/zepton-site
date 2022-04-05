When updating text instead of updating it in place you can add a transition to it by using the
`$key` node.

```javascript

import { render, createState, $, $key } from 'zepton';
import { fadeUp } from 'zepton/transitions';

export default function() {
  const state = createState({
    count: 1
  });
  const template = $('.view',
    { style: 'display: flex;' },
    $key(_ => state.count, _ => [
      $('.count', _ => state.count, { transition: { fn: fadeUp } })
    ]),
    $('.buttons',
      $('button', 'Add', { $click: ev => state.count++ }),
    )
  );

  return render({ state, template });
}
```

The `$key` node can also be used to recreate a component instead of updating it in place.
