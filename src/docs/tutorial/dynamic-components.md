Sometimes you need to dynamically switch between components. You can use the $component function 
for that. It takes a function as the first parameter which returns a component function. When the 
component in the result changes it removes and re-renders the component.

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
