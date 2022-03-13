Let's add some reactivity into our small application. Reactivity is added by creating a state object.

use the `createState` function and pass the props to create a state object.

But you can see directly using `state.count` does not work. You have to create a function and return
the `state.count` value to make it reactive.

In zepton reactivity is acheived by using functions. Do the following change or click the show me
button to see the result.

```javascript
$('div', _ => `count => ${state.count}`);
```
---
