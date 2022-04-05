Components are building blocks of a zepton application. You can import child components using the
`import` keyword and call it as a function to create the component inside your template.

for example:

```javascript
  import { render, $ } from 'zepton';
  import ChildComponent from './child_component.js';

  export default function ParentComponent() {
    const template = $('div',
      $('h1', 'Parent component'),
      ChildComponent()
    );

    return render({ template });
  }
```
