import { render, $ } from 'zepton';
import RouterLink from './router-link.js';
import logoFull from '../assets/img/logo-full.png';

export default function() {
  const template = $('header',
    $('.container',
      $('a', { href: '/' }, $('img.logo', { src: logoFull })),
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
