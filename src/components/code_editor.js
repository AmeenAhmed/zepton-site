import { createApp, render, createState, $, $each, $if, $component, $html, $key } from 'zepton';
import { fade, zoom, slideDown, slideUp, slideLeft, slideRight, fadeDown, fadeUp, fadeLeft, fadeRight } from 'zepton/transitions';
import '../vendor/codemirror/lib/codemirror.js';
import '../vendor/codemirror/lib/codemirror.css';
import '../vendor/codemirror/mode/javascript/javascript.js';
import { transform } from '@babel/standalone';
import _ from 'lodash'

export default function({ files, showError = _ => _ } = {}) {
  const state = createState({
    files: files || [{ id: 'main', name: 'App.js', contents: 
`
import { render, $ } from 'zepton';

export default function () {
  const template = $('h1', 'Hello Zepton!');

  return render({ template });
}
`,
      exports: {},
      isEditable: false,
      inEditMode: false
    }],
    currentFile: 0,
    fileCount: 1
  });

  const require = (filename) => {
    if(filename === 'zepton') {
      return { render, createState, $, $if, $each, $component, $html, $key };
    } else if(filename === 'zepton/transitions') {
      return { fade, zoom, slideDown, slideUp, slideLeft, slideRight, fadeDown, fadeUp, fadeLeft, fadeRight };
    } else {
      const file = _.find(state.files, file => file.name === filename); 
      if(file) {
        return file.exports;
      }
    }
  }

  const exec = () => {
    try {
      for(let i=1; i<state.files.length; i++) {
        const exports = state.files[i].exports;
        const code = transform(state.files[i].contents, { presets: ['env'] });
        const fn = new Function('const require = arguments[0];const exports = arguments[1];' + code.code);
        fn(require, exports);
      }
      const exports = state.files[0].exports;
      const code = transform(state.files[0].contents, { presets: ['env'] });
      const fn = new Function('const require = arguments[0];const exports = arguments[1];' + code.code);
      fn(require, exports);
      createApp({ root: '#playground-app', component: exports.default }) 
    } catch(err) {
      showError(err.message);
      console.log(err);
    }
  }

  let codemirror;

  const addTab = ev => {
    state.files.push({
      id: '' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      name: `Component${state.fileCount}.js`,
      content: '',
      exports: {},
      isEditable: true,
      inEditMode: true
    });
    state.currentFile = state.files.length - 1;
    state.fileCount++;
    codemirror.getDoc().setValue('');
    setTimeout(_ => { 
      const items = document.querySelectorAll('.file-name');
      const item = items[items.length - 1];
      item.focus();
      item.selectionStart = item.selectionEnd = item.value.length;
    }, 0);
  }


  const template = $('.code-editor',
    $('.tabs', $each(state.files, item => item.id, (item, index) => [
      $('.tab', 
        $('input.file-name', {
          value: _ => item().name.replace('.js', ''),
          class: _ => `${item().inEditMode ? 'edit-mode' : ''} ${item().isEditable ? '' : 'non-editable'}`,
          style: _ => ({ width: (item().name.length - 3) + 'ch' }),
          readonly: _ => !item().isEditable || !item().inEditMode,
          $input: ev => item().name = ev.target.value + '.js'
        }),
        '.js',
        { 
          class: _ => state.currentFile === index() ? 'active' : '',
          $click: ev => { 
            if(state.currentFile !== index()) {
              state.files[state.currentFile].inEditMode = false;
              state.currentFile = index();
              codemirror.getDoc().setValue(state.files[state.currentFile].contents);
              ev.stopPropagation();
            } else {
              state.files[index()].inEditMode = true;
            }
          }
        }
      )
    ]), $('button.add-file', $('i.fas.fa-plus'), { $click: addTab })),
    $('.codemirror-root')
  );

  let dontUpdate = false;

  const mounted = _ => {
    const contentRoot = document.querySelector('#playground-app');
    codemirror = CodeMirror(document.querySelector('.codemirror-root'), {
      value: state.files[state.currentFile].contents,
      mode: 'javascript',
      lineNumbers: true
    });

    codemirror.on('change', _ => {
      if(dontUpdate) {
        contentRoot.innerHTML = '';
        exec(); 
        return; 
      }
      dontUpdate = true;
      state.files[state.currentFile].contents = codemirror.getValue();
      contentRoot.innerHTML = '';
      showError('');
      exec();
      dontUpdate = false;
    });

    exec();
  }

  const updated = _ => {
    if(dontUpdate) return;
    dontUpdate = true;
    if(state.files[state.currentFile] && codemirror.getValue() !== state.files[state.currentFile].contents) {
      codemirror.setValue(state.files[state.currentFile].contents);
    }
    dontUpdate = false;
  }

  return render({ state, template, mounted, updated });
}
