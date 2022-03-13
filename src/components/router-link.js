import { render, $ } from 'zepton';


export default function({ href, text }) {
  const template = $('a', text, {
    href,
    $click: ev => {
      window.history.pushState({}, null, href);
      ev.stopPropagation();
      ev.preventDefault();
    }
  });

  return render({ template });
}
