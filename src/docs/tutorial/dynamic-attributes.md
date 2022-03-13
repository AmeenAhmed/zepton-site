To attributes to the nodes you need to pass an object and the attributes as keys. To learn more
about passing attributes you can look at the docs page on [attributes](/docs#attributes).

Reactivity is added the same way with passing functions which return the values.

In this example lets learn how reactive attributes can be created. In this example we will try to
toggle the checkbox when the label is clicked. This can be done by creating a state property and
creating a reactive attribute on the checkbox element and changing it on clicking the label. 

Creating the state property

```javascript
const state = createState({
  checked: true
});
```

Creating a reactive attribute

```javascript
$('input[type=checkbox]', {
  checked: _ => state.checked
});
```

Adding the event

```javascript
$('label', 'Click me', {
  $click: ev => state.checked = !state.checked
})
```

Don't forget to add the state

```javascript
return render({ state, template });
```
