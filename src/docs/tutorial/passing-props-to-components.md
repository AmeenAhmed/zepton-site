To pass any props to the child component we can just pass an object to it and provide the values as
keys.

```javascript
import { render, createState, $ } from 'zepton';
import ChildComponent from './child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Hello child component' });
  const template = $('div',
    $('h1', 'Parent component'),
    $('input[type=text]', {
      $input: ev => state.message = `Hello ${ev.target.value}`
    })
    ChildComponent({ message })
  );

  return render({ template });
}
```

child component: 
```javascript
import { render, $ } from 'zepton';

export default function ParentComponent({ message }) {
  const template = $('h1', message);

  return render({ template });
}
```

To make the passed prop message reactive, we need to make it a function.

```javascript
  ChildComponent({ _ => message })
```


