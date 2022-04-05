Like events, Zepton does not provide a native way for defining slots, but again like events, 
we can make use of props to create a slot like interface by just passing a node as a prop to the 
child component. Consider the below example

```javascript
export default function ParentComponent() {
  const state = createState({ count: 0 });

  setInterval(_ => state.count++);

  const template = $('.parent-view',
    ChildComponent({
      slot: _ => $('div', _ => `count is ${state.count}`)
    })
  );

  return render({ state, template });
}
```

And now the child component.

```javascript
export default function ChildComponent({ slot }) {
  const template = $('.child-component', slot());

  return render({ template })
}
```
