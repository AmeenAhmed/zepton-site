import { render, $, $each, $if, $html } from 'zepton';
import guideString from '../docs/Guide.md?raw';
import showdown from 'showdown';
import Docs from '../utils/docs.js';

export default function() {
  const converter = new showdown.Converter({ ghCompatibleHeaderId: true });
  const guide = converter.makeHtml(guideString);

  const template = $('.docs-page.page',
    $('aside', $('nav',
      $each(Docs, (item, index) => [
        $('div', $('a', item().title, { href: `#${item().id}`, class: _ => item().level === 1 ? 'title' : 'link' }))
      ])
    )),
    $('.content', $('.docs-container',
      $html(guide)
    ))
  );

  const mounted = _ => Prism.highlightAll();

  return render({ template, mounted, test: true });
}
