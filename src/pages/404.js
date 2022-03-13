import { render, $ } from 'zepton';

export default function() {
  const template = $('h1', 'Oops! Looks like you landed on a not existant page');

  return render({ template });
}
