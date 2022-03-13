import { render, createState, $, $html, $if, $each, $key } from 'zepton';
import Tutorials from '../utils/tutorials.js';
import Repl from '../components/repl.js';
import showdown from 'showdown';

export default function() {
  const state = createState({
    tutorial: 0,
    which: 'start'
  }); 

  const template = $('.tutorial-page.page',
    $('.tutorial-container',
      $('.tutorial-header',
        $('button.left', $('i.fa.fa-arrow-left'), { 
          $click: ev => state.tutorial = state.tutorial > 0 ? state.tutorial - 1 : state.tutorial
        }),
        $('.number', _ => `${state.tutorial + 1}/${Tutorials.length}`),
        $('select#tutorial', $each(Tutorials, (item, index) => [
          $('option', _ => item().name, {
            selected: _ => item().name == Tutorials[state.tutorial].name
          })
        ]), {
          $input: ev => {
            state.which = 'start';
            state.tutorial = ev.srcElement.selectedIndex;
          }
        }),
        $('button.down', $('i.fa.fa-chevron-down')),
        $('button.right', $('i.fa.fa-arrow-right'), {
          $click: ev => state.tutorial = state.tutorial < Tutorials.length - 1 ? 
                state.tutorial + 1 : state.tutorial
        })
      ),
      $('.tutorial-text-container', $html(_ => {
        const converter = new showdown.Converter({ ghCompatibleHeaderId: true });
        const html = converter.makeHtml(Tutorials[state.tutorial].tutorial);
        return html;
      })),
      $('.tutorial-footer', 
        $if(_ => Tutorials[state.tutorial].hasEnd, _ => [
          $('button.show', 'Show me', {
            $click: ev => state.which = 'end'
          }),
        ]),
        $('button.next', 'Next', $('i.fa.fa-arrow-right'), {
          $click: ev => { state.which = 'start'; state.tutorial++; }
        })
      )
    ),
    $key(_ => state.tutorial + state.which, _ => [
      $('.repl-container', Repl({ files: Tutorials[state.tutorial][state.which].files }))
    ])
  );

  const updated = _ => Prism.highlightAll();

  return render({ state, template, updated });
}
