import { render, createState, $, $each, $key } from 'zepton';
import Repl from '../components/repl.js';
import Examples from '../utils/examples.js';

export default function() {
  const state = createState({ currentExample: 0 })
  const template = $('.examples-page.page',
    $('.examples-list',
      $each(Examples, (item, index) => [
        $('.example', `${index() + 1}. `, item().name, {
          $click: ev => state.currentExample = index(),
          class: _ => ({ active: state.currentExample === index() })
        })
      ])
    ),
    $key(_ => state.currentExample, _ => [
      $('.repl-container', Repl({ files: Examples[state.currentExample].files }))
    ])
  );

  return render({ state, template });
}
