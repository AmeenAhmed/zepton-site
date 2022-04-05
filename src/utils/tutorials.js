import tutorial1 from '../docs/tutorial/hello-world.md?raw';
import tutorial2 from '../docs/tutorial/adding-state.md?raw';
import tutorial3 from '../docs/tutorial/dynamic-attributes.md?raw';
import tutorial4 from '../docs/tutorial/inserting-html.md?raw';
import tutorial5 from '../docs/tutorial/if-blocks.md?raw';
import tutorial6 from '../docs/tutorial/else-block.md?raw';
import tutorial7 from '../docs/tutorial/elseif-blocks.md?raw';
import tutorial8 from '../docs/tutorial/each-block.md?raw';
import tutorial9 from '../docs/tutorial/keyed-each-block.md?raw';
import tutorial10 from '../docs/tutorial/attaching-events.md?raw';
import tutorial11 from '../docs/tutorial/lifecycle-events.md?raw';
import tutorial12 from '../docs/tutorial/components.md?raw';
import tutorial13 from '../docs/tutorial/passing-props-to-components.md?raw';
import tutorial14 from '../docs/tutorial/component-events.md?raw';
import tutorial15 from '../docs/tutorial/component-slots.md?raw';
import tutorial16 from '../docs/tutorial/dynamic-components.md?raw';


export default [
  {
    name: 'Hello world',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $ } from 'zepton';

export default function() {
  const template = $('h1', 'Hello Zepton!');

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ],
    },
    tutorial: tutorial1,
    hasEnd: false
  },
  {
    name: 'Adding state',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ count: 0 });
  const template = $('.view', 
    $('div', \`count => \$\{state.count\}\`),
    $('button', 'Increment', { $click: ev => state.count++ })
  );
  
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ count: 0 });
  const template = $('.view', 
    $('div', _ => \`count => \$\{state.count\}\`),
    $('button', 'Increment', { $click: ev => state.count++ })
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial2,
    hasEnd: true
  },
  {
    name: 'Dynamic attributes',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $ } from 'zepton';

export default function() {
  const template = $('.view',
    $('input[type=checkbox]', { checked: true }),
    $('label', 'Click me', { style: { 'margin-left': '8px' } })
  );
  
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    checked: true
  });
  const template = $('.view',
    $('input[type=checkbox]', { checked: _ => state.checked }),
    $('label', 'Click me', {
      style: { 'margin-left': '8px' },
      $click: ev => state.checked = !state.checked
    })
  );
  
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial3,
    hasEnd: true
  },
  {
    name: 'Inserting HTML',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $ } from 'zepton';

export default function() {
  const h1 = '<h1>Hello world!</h1>'
  const template = $('.view',
    h1
  );
  
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $, $html } from 'zepton';

export default function() {
  const h1 = '<h1>Hello world!</h1>'
  const template = $('.view',
    $html(h1)
  );
  
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial4,
    hasEnd: true
  },
  {
    name: 'If blocks',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ isActive: false });
  const toggle = ev => state.isActive = !state.isActive;
  const template = $('.view',
    $('button', 'Activate', { $click: toggle }),
    $('button', 'Deactivate', { $click: toggle })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $if } from 'zepton';

export default function() {
  const state = createState({ isActive: false });
  const toggle = ev => state.isActive = !state.isActive;
  const template = $('.view',
    $if(_ => !state.isActive, _ => [
      $('button', 'Activate', { $click: toggle }),
    ]),
    $if(_ => state.isActive, _ => [
      $('button', 'Deactivate', { $click: toggle })
    ])
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial5,
    hasEnd: true
  },
  {
    name: 'Else block',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ isActive: false });
  const toggle = ev => state.isActive = !state.isActive;
  const template = $('.view',
    $('button', 'Activate', { $click: toggle }),
    $('button', 'Deactivate', { $click: toggle })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $if } from 'zepton';

export default function() {
  const state = createState({ isActive: false });
  const toggle = ev => state.isActive = !state.isActive;
  const template = $('.view',
    $if(_ => !state.isActive, _ => [
      $('button', 'Activate', { $click: toggle }),
    ]).$else(_ => [
      $('button', 'Deactivate', { $click: toggle })
    ])
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial6,
    hasEnd: true
  },
  {
    name: 'Elseif block',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $, $if } from 'zepton';

export default function() {
  const count = 0;
  const template = $('.view',
    $if(_ => count == 0, _ => [
      'Count is zero'
    ]).$else(_ => [
      $if(_ => count < 0, _ =>[
        'Count is negative'
      ]).$else(_ => [
        'Count is positive'
      ])
    ])
  );
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $, $if } from 'zepton';

export default function() {
  const count = 0;
  const template = $('.view',
    $if(_ => count == 0, _ => [
      'Count is zero'
    ]).$elseif(_ => count < 0, _ => [
        'Count is negative'
    ]).$else(_ => [
      'Count is positive'
    ])
  );
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial7,
    hasEnd: true
  },
  {
    name: 'Each block',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    list: ['Bread', 'Eggs', 'Milk']
  });
  const template = $('.view',
    $('ul', 
      $('li', state.list[0]),
      $('li', state.list[1]),
      $('li', state.list[2])
    )
  );
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $each } from 'zepton';

export default function() {
  const state = createState({
    list: ['Bread', 'Eggs', 'Milk']
  });
  const template = $('.view',
    $('ul', 
      $each(state.list, (item, index) => [
        $('li', item())
      ])
    )
  );
  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial8,
    hasEnd: true
  },
  {
    name: 'Keyed each block',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $each } from 'zepton';
import { fade } from 'zepton/transitions';

export default function() {
  const state = createState({
    count: 3,
    list: [3, 2, 1]
  });
  const template = $('.view',
    $('ul', 
      $each(state.list, (item, index) => [
        $('li', _ => item(), { transition: { fn: fade } })
      ])
    ),
    $('button', 'New item', {
      $click: ev => state.list.unshift(++state.count)
    })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $each } from 'zepton';
import { fade } from 'zepton/transitions';

export default function() {
  const state = createState({
    count: 3,
    list: [3, 2, 1]
  });
  const template = $('.view',
    $('ul', 
      $each(state.list, item => item, (item, index) => [
        $('li', _ => item(), { transition: { fn: fade } })
      ])
    ),
    $('button', 'New item', {
      $click: ev => state.list.unshift(++state.count)
    })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial9,
    hasEnd: true
  },
  {
    name: 'Attaching events',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    timesClicked: 0
  });
  const template = $('.view',
    $('div', _ => \`Clicked\ \$\{state.timesClicked\} times\`),
    $('button', 'Click me!')
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    timesClicked: 0
  });
  const template = $('.view',
    $('div', _ => \`Clicked\ \$\{state.timesClicked\} times\`),
    $('button', 'Click me!', {
      $click: ev => state.timesClicked++
    })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial10,
    hasEnd: true
  },
  {
    name: 'Lifecycle events',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    count: 0,
  });
  const template = $('.view',
    $('div', _ => \`count => \$\{state.count\}\`),
    $('button', 'Increment',  { $click: ev => state.count++ })
  );
  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({
    count: 0,
  });
  const template = $('.view',
    $('div', _ => \`count => \$\{state.count\}\`),
    $('button', 'Increment', { $click: ev => state.count++ })
  );
  return render({
    state,
    template,
    updated() {
      alert('Updated...');
    }
  });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial11,
    hasEnd: true
  },
  {
    name: 'Components',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ParentComponent() {
  const template = $('div',
    $('h1', 'Parent component'));

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('div',
    $('h1', 'Child component'));

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, $ } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const template = $('div',
    $('h1', 'Parent component'),
    ChildComponent()
  );

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('div',
    $('h1', 'Child component'));

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial12,
    hasEnd: true
  },
  {
    name: 'Passing props to components',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Hello child component' });
  const template = $('div',
    $('h1', 'Parent component'),
    $('input[type=text]', {
      $input: ev => state.message = \`Hello \$\{ev.target.value\}\`
    }),
    ChildComponent({ message: state.message })
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ParentComponent({ message }) {
  const template = $('h1', message);

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Hello child component' });
  const template = $('div',
    $('h1', 'Parent component'),
    $('input[type=text]', {
      $input: ev => state.message = \`Hello \$\{ev.target.value\}\`
    }),
    ChildComponent({ message: _ => state.message })
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ParentComponent({ message }) {
  const template = $('h1', message);

  return render({ template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial13,
    hasEnd: true
  },
  {
    name: 'Component events',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Not clicked yet!' });
  const template = $('.parent-view',
    $('h1', _ => state.message),
    ChildComponent()
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('.child-view', $('button', 'Click me!'));

  return render({ template });
}

`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    end: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $ } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const state = createState({ message: 'Not clicked yet!' });
  const template = $('.parent-view',
    $('h1', _ => state.message),
    ChildComponent({ $clicked: text => state.message = text })
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent({ $clicked }) {
  const template = $('.child-view', $('button', 'Click me!', {
    $click: ev => $clicked('You clicked it!')
  }));

  return render({ template });
}

`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial14,
    hasEnd: true
  },
  {
    name: 'Component slots',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { $, render, createState } from 'zepton';
import ChildComponent from 'child_component.js';

export default function ParentComponent() {
  const state = createState({ count: 0 });

  setInterval(_ => state.count++, 1000);

  const template = $('.parent-view',
    ChildComponent({
      slot: _ => $('div', _ => \`count is \$\{state.count\}\`)
    })
  );

  return render({ state, template });
}
`,
          exports: {},
          isEditable: false,
          inEditMode: false
        },
        {
          id: 'child_component.js',
          name: 'child_component.js',
          contents:
`
import { $, render} from 'zepton';

export default function ChildComponent({ slot }) {
  const template = $('.child-component', slot());

  return render({ template })
}

`,
          exports: {},
          isEditable: false,
          inEditMode: false
        }
      ]
    },
    tutorial: tutorial15,
    hasEnd: false
  },
  {
    name: 'Dynamic components',
    start: {
      files: [
        {
          id: 'app.js',
          name: 'App.js',
          contents:
`
import { render, createState, $, $component } from 'zepton';
import Tab1 from 'tab1.js';
import Tab2 from 'tab2.js';
import Tab3 from 'tab3.js';

export default function Main() {
  const state = createState({ tab: 'tab1' });

  const selectTab = name => state.tab = name;

  const template = $('.main-view',
    $('.tab-component',
      $('.tab', 'Tab1', { $click: ev => selectTab('tab1') }),
      $('.tab', 'Tab2', { $click: ev => selectTab('tab2') }),
      $('.tab', 'Tab3', { $click: ev => selectTab('tab3') }),
      { style: 'display: flex; gap: 8px;' }
    ),
    $component(_ => {
      if(state.tab === 'tab1') return Tab1;
      else if(state.tab === 'tab2') return Tab2;
      else return Tab3;
    })
  )

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      },
      {
        id: 'tab1.js',
        name: 'tab1.js',
        contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('.child-component', $('h1', 'Tab1'));

  return render({ template })
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      },
      {
        id: 'tab2.js',
        name: 'tab2.js',
        contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('.child-component', $('h1', 'Tab2'));

  return render({ template })
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      },
      {
        id: 'tab3.js',
        name: 'tab3.js',
        contents:
`
import { render, $ } from 'zepton';

export default function ChildComponent() {
  const template = $('.child-component', $('h1', 'Tab3'));

  return render({ template })
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  tutorial: tutorial16,
  hasEnd: false
 }
]
