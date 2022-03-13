import { render, $ } from 'zepton';

export default function({ lang, text }) {
  const template = $('pre.readonly', $('code', text, { class: `language-${lang}` }));

  return render({ template });
}
