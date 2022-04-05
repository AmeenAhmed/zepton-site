You can define your own custom transition function. The fade function looks like this,

```javascript
export function fade({ delay = 0, duration = 400, easing = 'linear'} = {}) {
  return {
    delay,
    duration,
    easing,
    in: {
      opacity: [0, 1],
    },
    out: {
      opacity: [1, 0],
    }
  };
}
```

it takes an object as the first argument which has the following properties

- **delay**: the transition delay
- **duration**: the transition duration
- **easing**: the css easing function applied to the transition
- **in**: This object contains the properties which is used for the enter transition after mount.
- **out**: This object contains the properties which is used for the exit transition before remove.

The in and out object takes css properties as keys and an array with exactly two values which are 
the beginning and end of that particular transition. You can add as many css properties here as you 
want here.

In this example we'll define and use the rotate transition.

```javascript
function rotate({delay = 0, duration = 200, easing = 'ease-out'} = {}) {
  return {
    delay,
    duration,
    easing,
    in: {
      transform: ['rotate(360deg)', 'rotate(0deg)'], 
    },
    out: {
      transform: ['rotate(0deg)', 'rotate(360deg)']
    }
  };
}
```

use the transition by passing it as,

```javascript
{ transition: { fn: rotate } }
```
