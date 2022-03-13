import { render, createState, $, $if } from 'zepton';
import CodeEditor from './code_editor.js';

export default function({ layout, files } = {}) {
  const state = createState({
    error: null
  });

  const showError = error => { 
    console.log('Error => ', error); 
    state.error = error 
  };

  const template = $('.repl', { class: _ => layout === 'cols' ? 'cols' : 'rows' },
   $('.left-panel', CodeEditor({ showError, files })),
    $('.right-panel', $('#playground-app'), 
      $if(_ => state.error, _ => [
        $('.error-msg', $('i.fas.fa-times-circle'), _ => state.error)
      ])
    )
  )

  return render({ state, template });
}
