import { render, $ } from 'zepton';
import RouterLink from './router-link.js';

export default function() {
  const template = $('header',
    $('.container',
      $('a', { href: '/' }, $('img.logo', { src: 'src/assets/img/logo-full.png' })),
      $('.nav',
        RouterLink({ href: '/tutorial', text: 'Tutorial' }),
        RouterLink({ href: '/docs', text: 'Docs' }),
        RouterLink({ href: '/playground', text: 'Playground' }),
        RouterLink({ href: '/examples', text: 'Examples' })
      ),
      $('.tray', $('a', $('i.fab.fa-github'), { href: 'https://github.com/AmeenAhmed/zepton' }))
    )
  );

  return render({ template });
}
