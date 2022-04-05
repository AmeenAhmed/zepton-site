You can attach lifecycle events to your components by passing the method to the `render` function.
Zepton provides the below lifecycle events.

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed 

If we want to execute some code whenever our component is updated, we can pass the `updated` function
to the `render` function.

```javascript
return render({
  state,
  template,
  updated() {
    alert('Updated...');
  }
});
```

