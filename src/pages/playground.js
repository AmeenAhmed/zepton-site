import { render, $, $if } from 'zepton';
import Repl from '../components/repl.js';
export default function() {
  const template = $('.playground-page.page',
    Repl({ layout: 'cols' })
  );

  return render({ template });
}
