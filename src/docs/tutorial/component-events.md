Zepton does not provide a native way to attach event handlers to a child components' custom event. 
Since we can pass a function to a component its just trivial to call that function on a child 
component. Naming the event handler with a $ prefixed to the name is convention. 
$customEvent like so. Lets look at some code.

```javascript
import { render, createState, $ } from 'zepton';
import ChildComponent from './child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Not clicked yet!' });
  const template = $('.parent-view',
    $('h1', _ => state.message),
    ChildComponent({ $clicked: text => state.message = text })
  );

  return render({ state, template });
}
```

and the child component:

```javascript
import { render, $ } from 'zepton';

export default function ChildComponent({ $clicked }) {
  const template = $('.child-view', $('button', 'Click me!', {
    $click: ev => $clicked('You clicked it!')
  }));

  return render({ template });
}
```
