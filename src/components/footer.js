import { render, $ } from 'zepton';

export default function () {
  const template = $('footer', 
    $('div', 'Licensed under the MIT license.'),
    $('div', 'Copyright 2022 Ameen Ahmed')
  );

  return render({ template });
}




