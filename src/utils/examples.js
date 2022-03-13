export default [
  {
    name: 'Hello world',
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
  {
    name: 'Adding state',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ name: 'Ameen' });
  const template = $('h1', 'Hello ', state.name, '!');

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Reactivity',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ count: 0 });
  const template = $('h1', 'Count = ', _ => state.count);

  setInterval(_ => state.count++, 1000);

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Attributes',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, $ } from 'zepton';

export default function() {
  const template = $('h1', 'Hello world!', { id: 'main' });

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Class object helper',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, $ } from 'zepton';

export default function() {
  const template = $('h1', 'Hello world!', { class: { title: true } });

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Class array helper',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ isActive: true });
  const template = $('h1', 'Hello world!', {
    class: ['title', { isActive: _ => state.isActive }]
  });

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Style helper',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, $ } from 'zepton';

export default function() {
  const template = $('h1', 'Hello world!', { 
    style: {
      'background-color': 'black',
      'color': 'white'
    }
  });

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'If block',
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
    $if(_ => count < 0, _ => [
      $('div', 'Count is negative!')
    ]).$elseif(_ => count === 0, _ => [
      $('div', 'Count is zero!')
    ]).$else(_ => [
      $('div', 'Count is positive!')
    ])
  )

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Each block',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';

export default function() {
  const state = createState({
    list: [1, 2, 3, 4, 5]
  });
  const template = $('.view',
    $each(state.list, (item, index) => [
      $('.item', _ => item())
    ])
  );

  setInterval(_ => {
    state.list.reverse();
  }, 1000);

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ]
  },
  {
    name: 'Keyed each block',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';

export default function() {
  const state = createState({
    list: [
      { id: 'item-1', title: 'Bread' },
      { id: 'item-2', title: 'Eggs' },
      { id: 'item-3', title: 'Milk' }
    ]
  });
  const template = $('ul.items',
    $each(state.list, item => item.id, (item, index) => [
      $('li.item', _ => item().title)
    ]),
    $('button', 'Add item', {
      $click: ev => state.list.unshift({ id: 'item-0', title: 'Chicken' })
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
  {
    name: 'Attaching events',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $ } from 'zepton';

export default function() {
  const state = createState({ numClicks: 0 });
  const template = $('.view',
    $('button',
      _ => state.numClicks === 0 ? 'Click me!' : \`Clicked \$\{state.numClicks\} times!\`,
      { $click: ev => state.numClicks++ }
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Obligatory todo example',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';

export default function() {
  const state = createState({ 
    list: [
      { id: 'item-0', title: 'Look at examples', done: true },
      { id: 'item-1', title: 'Try them', done: false },
      { id: 'item-2', title: 'Love it!', done: false }
    ],
    text: ''
  });
  const template = $('.view',
    $('input[type=text]', {
      placeholder: 'Todo text here...',
      $input: ev => state.text = ev.target.value
    }),
    $('button', 'Add todo', {
      $click: ev => state.list.push({
        id: \`item-\$\{state.list.length\}\`,
        title: state.text,
        done: false
      })
    }),
    $('ul',
      $each(state.list, item => item.id, (item, index) => [
        $('li.item',
          $('input[type=checkbox]', { checked: _ => item().done, $input: ev => item().done = !item().done }),
          $('span.item-text', ' ', _ => item().title, {
            style: _ => \`text-decoration: \$\{item().done ? 'line-through' : 'none'\}; cursor: pointer;\`,
            $click: ev => item().done = !item().done
          })
        )
      ])
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Child components',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, $ } from 'zepton';
import ChildComponent from 'child_component.js'

export default function() {
  const template = $('.view',
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

export default function() {
  const template = $('.view',
    $('h1', 'Child component'),
  );

  return render({ template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Child component events',
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
    ],
  },
  {
    name: 'Child component slots',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $ } from 'zepton';
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
import { render, $ } from 'zepton';

export default function ChildComponent({ slot }) {
  const template = $('.child-component', slot());

  return render({ template })
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Dynamic components',
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
  {
    name: 'Transitions',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';
import { fadeDown } from 'zepton/transitions';

export default function() {
  const state = createState({
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    count: 10
  });
  const template = $('.view',
    $('.list',
      { style: 'display: flex; gap: 8px;' },
      $each(state.list, item => item, (item, index) => [
        $('.item', _ => item(), { transition: { fn: fadeDown } })
      ])
    ),
    $('.buttons',
      { style: 'margin-top: 40px; display: flex; gap: 8px;' },
      $('button', 'Add', { $click: ev => state.list.push(++state.count) }),
      $('button', 'Remove', { $click: ev => state.list.shift() })
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Custom transitions',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';

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

export default function() {
  const state = createState({
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    count: 10
  });
  const template = $('.view',
    $('.list',
      { style: 'display: flex; gap: 8px;' },
      $each(state.list, item => item, (item, index) => [
        $('.item', _ => item(), { transition: { fn: rotate } })
      ])
    ),
    $('.buttons',
      { style: 'margin-top: 40px; display: flex; gap: 8px;' },
      $('button', 'Add', { $click: ev => state.list.push(++state.count) }),
      $('button', 'Remove', { $click: ev => state.list.shift() })
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Different in and out transitions',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $each } from 'zepton';
import { fadeUp, zoom } from 'zepton/transitions';

export default function() {
  const state = createState({
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    count: 10
  });
  const template = $('.view',
    $('.list',
      { style: 'display: flex; gap: 8px;' },
      $each(state.list, item => item, (item, index) => [
        $('.item', _ => item(), { in: { fn: zoom }, out: { fn: fadeUp } })
      ])
    ),
    $('.buttons',
      { style: 'margin-top: 40px; display: flex; gap: 8px;' },
      $('button', 'Add', { $click: ev => state.list.push(++state.count) }),
      $('button', 'Remove', { $click: ev => state.list.shift() })
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
  {
    name: 'Key block',
    files: [
      {
        id: 'app.js',
        name: 'App.js',
        contents:
`
import { render, createState, $, $key } from 'zepton';
import { fadeUp } from 'zepton/transitions';

export default function() {
  const state = createState({
    count: 1
  });
  const template = $('.view',
    { style: 'display: flex;' },
    $key(_ => state.count, _ => [
      $('.count', _ => state.count, { transition: { fn: fadeUp } })
    ]),
    $('.buttons',
      $('button', 'Add', { $click: ev => state.count++ }),
    )
  );

  return render({ state, template });
}
`,
        exports: {},
        isEditable: false,
        inEditMode: false
      }
    ],
  },
]
