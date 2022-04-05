# Introduction

---

## What is Zepton?
Zepton is a small and flexible Javascript library for building user interfaces. The core library is less than 1000 lines of code, 
less than 5kb compressed and gzipped. Its fast, it doesn't use a virtual DOM. Components are written in plain old javascript, so its familiar and quite flexible.

---
## Quick Start
### CDN
You can get the zepton file from CDN and use it in your html file.
```html
<script src="https://unpkg.com/zepton/zepton.js"></script>
```
### Build tools

To use it with a build tool like vite for example (which is recommended), first create the project by running

```shell
$ npm create vite@latest
```

Then install Zepton.

```shell
$ npm install zepton --save
```

Then empty the main.js file and paste the following code:

```javascript
import { createApp, render, $} from 'zepton';

function MainComponent() {
  const template = $('h1', 'Hello World');

  return render({ template });
}

Zepton({
  root: '#app',
  component: MainComponent
});
```

### Using degit

You can scaffold a Zepton project from the template using degit. Run the following command in your commandline

```shell
$ npx degit AmeenAhmed/zepton-template my-zepton-project
$ cd my-zepton-project
$ npm install
$ npm run dev
```

----------

# Essentials

----------

## The application instance

A Zepton application is created by calling the  `createApp`  function to create an instance of the application.

```javascript
import { createApp } from 'zepton';

createApp({
  root: '#app', // The html node where the application component is appended to
  component: Main // The root component of the application
})
```

----------

## A simple component

Zepton applications are built using components. The components are just functions which return the result of the  `render`  function. HTML elements are created using the  `$`  function. The template should be passed to the `render` function with the property name `template`.

```javascript
import { render, $ } from 'zepton';

export default function() {
  const template = $('div', 'Hello world!');

  return render({ template });
}
```

the  `$`  function creates an HTML element. It takes a selector as the first parameter. A selector can contain a tag name eg:  `'div'`, or it can be contain a class  `'.class-example'`  or an id  `'#el-id'`  or even an attribute,  `'input[type=text]'`It can be any combination of the above as well.

```javascript
$('input#email.field[type=text]')
```

The  `$`  function takes variable number of arguments. The arguments can be a string, a function or an options object. We'll talk about those later in this doc.

---

## Adding state
We can create a reactive state object by using the `createState` function. 
```javascript
const state = createState({
	name: 'Bruce'
});
```
the `createState` function returns a state object which needs to be passed to the render function with the property name as `state`. 

Lets look at the full component code:
```javascript
import { createState, render, $ } from 'zepton';

export default function() {
	const state = createState({ name: 'Bruce'});
	const template = $('h1', `Hello ${state.name}!`);
	return render({ state, template })
}
```

---

## Reactivity
In the previous example we saw how to create a state object and add it to the template as text, but the above example would not reactively update if the name changes. Let look at another example to understand reactivity in Zepton.

```javascript
import { render, $, createState} from 'zepton';

export default function() {
	const state = createState({ count: 0 });
	const template = $('h1', `Count => ${state.count}`);
  	setInterval(_ => state.count++, 1000);
	return render({ state, template });
}
```
Note that the count won't change in the above example. The way to make it reactive is to wrap `state.count` in an arrow function like this:

```javascript
import { render, $, createState} from 'zepton';

export default function() {
	const state = createState({ count: 0 });
	const template = $('h1', 'Count => ', _ => state.count);
  	setInterval(_ => state.count++, 1000);
	return render({ state, template });
}
```
Now the count changes every second.

---

## Attributes
The `$` function takes a variable number of arguments. So far we passed a string and a function, now we'll look at how to create attributes for a particular node.

Attributes are created by passing an options object argument and keys are treated as attribute names. for eg:

```javascript
export default function() {
	const template = $('h1', 'Hello world!', { id: 'main' });
	return render({ template });
}
```
The above code creates an id attribute for the `h1` node.

Similar to how reactivity is achieved with the text in the above count example. You can make the attribute value reactive by passing a function to it. Consider the below example.

```javascript
export default function() {
	const state = createState({ count: 0 });
	const template = $('h1', 'Hello world!', { 
		class: _ => state.count % 2 === 0 ? 'even' : 'odd'
	});
	setInterval(_ => state.count++, 1000);
	return render({ state, template });
}
```
In the above example the class for the `h1` node changes between `even` and `odd` every second.

---
## Class helpers
### Passing an object

Passing an object to the class property toggles the class key when the value is truthy.

```javascript
const template = $('h1', 'Hello world', {
	class: { title: true }
});
```
The above code will add the class `title` to the `h1` node.

### Passing an array

Passing an array to the class property combines all the values in the array and applies it to the node.

```javascript
const template = $('h1', 'Hello world', {
	class: ['title', { isActive: _ => state.isActive }]
});
```

Note that in the above example we can combine arrays and objects and even pass functions to make the property reactive.

---

## Style helpers
Passing an object to the style property adds the keys as style properties to the node.

```javascript
const template = $('h1', 'Hello world', {
	style: {
		'background-color': 'black',
		'color': 'white'
	}
});
```

## inserting HTML
HTML can be inserted in the view by using the `$html` function. As with other nodes you can pass a function to it instead of a string to make it reactive.

```javascript
const template = $html('<h1>Hello world</h1>')
```

---

## Conditional rendering

### `$if`
The `$if` function is used to conditionally render nodes. The `$if` function takes two parameters. The first parameter is a function which returns the result of a condition. If the return value of that function is truthy, it renders the array of nodes that is the result of the second parameter.

```javascript
$if(_ => state.isActive, _ => [
	$('div', 'It is active')
]);
```

### `$else`
The `$else` part of the `$if` block is chained to the `$if` function. When the condition function of the `$if` function returns a falsey value then the `$else` block is rendered.

```javascript
$if(_ => state.isActive, _ => [
	$('div', 'It is active')
]).$else(_ => [
	$('div', 'It is not active')
])
```

### `$elseif`
As the name suggests the `$elseif` function is used to add else if blocks to the `$if` function. The `$elseif` function is also chained with the `$if`function.

```javascript
$if(_ => state.number < 0, _ => [
	$('div', 'The number is negative')
]).$elseif(_ => state.number === 0, _ => [
	$('div', 'The number is zero')
]).$else(_ => [
	$('div', 'The number is positive')
])
```

A full example:

```javascript
export default function() {
	const count = 1;
	const template = $('.view', 
		$if(_ => count < 0, _ => [
			$('.message', 'The number is negative')
		]).$elseif(_ => count === 0, _ => [
			$('.message', 'The number is zero')
		]).$else(_ => [
			$('div', 'The number is positive')
		])
	)
	return render({ template });
}
```

---

## List rendering
To render a list use the `$each` function. It takes an array as the first parameter and a function that returns an array of nodes
as the second parameter.

```javascript
export default function() {
  const state = createState({
    list: [
      'Bread', 'Eggs', 'Milk'
    ]
  });

  const template = $('ul',
    $each(state.list, (item, index) => [
      $('li', _ => item())
    ])
  );

  return render({ state, template });
}
```

Notice the function passed as the second paramater to the `$each` has two arguments, `item` and `index`. They themselves are functions to preserve 
the reactivity. so if the list item is an object the object is returned by the `item` function. for eg:

```javascript
$each(state.list, (item, index) => [
  $('li', _ => item().name)
]);
```

The above list rendering method has a problem. if you delete the first element of the object using the array `shift` method, the first `li` node will
not be deleted, instead the last node is deleted and the other existing nodes will render the text based on the list. This happens because there is no way
to uniquely identify the list node. We'll talk about how to do that next.

### Keyed each block
To associate a key with each list item the second argument passed to the `$each` function needs to be a `key` function. The key function gets the list item
passed as the argument and you can return the unique key associated with it.

```javascript
export default function() {
  const state = createState({
    list: [
      { id: 'item-1', title: 'Bread' },
      { id: 'item-2', title: 'Eggs' },
      { id: 'item-3', title: 'Milk' },
    ]
  });

  const template = $('ul',
    $each(state.list, item => item.id, (item, index) => [
      $('li', _ => `id => ${ item().id }`, ' : ', _ => item().title)
    ])
  );

  return render({ state, template })
}
```

Now when the first item is deleted using the `shift` function, only that particular node gets deleted. This makes the rendering more efficient and results in
fewer DOM updates.

---

## Event handling

Event handlers can be attached inside the options object using the syntax `$click` for eg. 

```javascript
export default function() {
  const template = $('button', 'Click me!', {
    $click: ev => alert('I was clicked!')
  });

  return render({ template })
}
```

the event object is passed to the function, and can be used to get information from the event.

```javascript
export default function() {
  const state = createState({ name: 'Bruce' });
  const template = $('.view', 
    $('h1', 'Hello ', _ => state.name, '!'), 
    $('input[type=text]', {
      $input: ev => state.name = ev.target.value
    })
  );

  return render({ state, template })
}
```

---

## Lifecycle events
Zepton components render in different stages. The user can execute some code before or after these various stages by attaching lifecycle events.
Lifecycle events are passed to the render function. Consider the below example expailing how lifecycle events can be passed.

```javascript
export default function() {
  const template = $('h1', 'Hello world');

  return render({ 
    template,
    mounted() {
      console.log('The component is now mounted');
    }
  })
}
```

Below is a list of the available life cycle events:

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

---

# Components

---

Zepton applications are built using components. You can add coponents by importing it using the `import` function and just passing the result to either the
template or as a child node to another node.

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
---
## Passing props

To pass any props to the child component we can just pass an object to it and provide the values as keys.

```javascript
import { render, $ } from 'zepton';
import ChildComponent from './child_component.js';

export default function ParentComponent() {
  const template = $('div', 
    $('h1', 'Parent component'),
    ChildComponent({ message: 'Hello child component' })
  );

  return render({ template });
}
```

But what if you want to pass a state property to the child component. for eg:

```javascript
import { render, createState, $ } from 'zepton';
import ChildComponent from './child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Hello child component' });
  const template = $('div', 
    $('h1', 'Parent component'),
    $('input[type=text]', {
      $input: ev => state.message = `Hello ${ev.target.value}`
    }),
    ChildComponent({ message: state.message })
  );

  return render({ state, template });
}
```

The above example has a problem. The value `message` is passed by value and any change in the actual state property, does not update the child component.
To actually make the passed prop `message` reactive, we need to make it a function.

```javascript
import { render, createState, $ } from 'zepton';
import ChildComponent from './child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Hello child component' });
  const template = $('div', 
    $('h1', 'Parent component'),
    $('input[type=text]', {
      $input: ev => state.message = `Hello ${ev.target.value}`
    }),
    ChildComponent({ message: _ => message })
  );

  return render({ state, template });
}
```

and the child component:

```javascript
import { render, $ } from 'zepton';

export default function ParentComponent({ message }) {
  const template = $('h1', message);

  return render({ template });
}
```

Now you can use the function message name and pass it to some node and it will be reactive since passed functions to nodes are reactive.

---

## Component events

Zepton does not provide a native way to attach event handlers to a child components' custom event. Since we can pass a function to a component its just
trivial to call that function on a child component. Naming the event handler with a `$` prefixed to the name is convention. `$customEvent` like so. Lets look
at some code. The parent component:

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

---

## Slots

Like events, Zepton does not provide a native way for defining slots, but again like events, we can make use of props to create a slot like interface by just
passing a node as a prop to the child component. Consider the below example

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

---

## Dynamic components

Sometimes you need to dynamically switch between components. You can use the `$component` function for that. It takes a function as the first
parameter which returns a component function. When the component in the result changes it removes and re-renders the component.

```javascript
export default function Main() {
  const state = createState({ tab: 'tab1' });

  const selectTab = name => state.tab = name;

  const template = $('.main-view',
    $('.tab-component',
      $('.tab', 'Tab1', { $click: ev => selectTab('tab1') }),
      $('.tab', 'Tab2', { $click: ev => selectTab('tab2') }),
      $('.tab', 'Tab3', { $click: ev => selectTab('tab3') })
    ),
    $component(_ => {
      if(state.tab === 'tab1') return Tab1;
      else if(state.tab === 'tab2') return Tab2;
      else return Tab3;
    })
  )

  return render({ state, template });
}
```

You can also pass props the dynamic components by using the second parameter of the `$component` function.

```javascript
$component(_ => {
  if(state.tab === 'tab1') return Tab1;
  else if(state.tab === 'tab2') return Tab2;
  else return Tab3;
}, { message: 'Tab number : ' })
```

---

# Transitions

---
You can apply animations to elements when they are mounted or removed on conditional rendering using the `transition`
property.

```javascript
import { render, createState, $, $if } from 'zepton';
import { fade } from 'zepton/transitions'; 

export default function() {
  const state = createState({ isVisible: true });
	const template = $('.view',
    $('input[type=checkbox]', {
      checked: true, 
      $input: ev => state.isVisible = !state.isVisible 
    }),
    $('label', ' isVisible'),
    $if(_ => state.isVisible, _ => [
      $('.msg', 'Hello world', { transition: { fn: fade } })
    ])
  );

  setInterval(_ => state.count ++, 1000);

  return render({ state, template });
}
```
---

## Passing properties to the transition function

In the above example, we can pass some properties to the transition to customize it.

```javascript
$('.msg', 'Hello world', { transition: { fn: fade, delay: 200, duration: 200, easing: 'ease-in-out'} })
```

---
## Custom transition function
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

- `delay`: the transition delay
- `duration`: the transition duration
- `easing`: the css easing function applied to the transition
- `in`: This object contains the properties which is used for the enter transition after mount.
- `out`: This object contains the properties which is used for the exit transition before remove.

The `in` and `out` object takes css properties as keys and an array with exactly two values which are the beginning and end
of that particular transition. You can add as many css properties here as you want here.

---

## Providing different transitions for enter and exit

You can define different transition functions for enter and exit animations. To acheive this, instead of using the `transition`
property you can use `in` and `out` properties.


```javascript
import { render, createState, $, $if } from 'zepton';
import { fadeLeft, fadeUp } from 'zepton/transitions'; 

export default function() {
  const state = createState({ isVisible: true });
	const template = $('.view',
    $('input[type=checkbox]', {
      checked: true, 
      $input: ev => state.isVisible = !state.isVisible 
    }),
    $('label', ' isVisible'),
    $if(_ => state.isVisible, _ => [
      $('.msg', 'Hello world', { in: { fn: fadeLeft }, out: { fn: fadeUp } })
    ])
  );

  setInterval(_ => state.count ++, 1000);

	return render({ state, template });
}
```

---

## The list of transitions provided by zepton

- `fade`
- `zoom`
- `slideDown`
- `slideUp`
- `slideLeft`
- `slideRight`
- `fadeDown`
- `fadeUp`
- `fadeDown`
- `fadeLeft`
- `fadeRight`


















