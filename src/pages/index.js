import { render, $ } from 'zepton';
import Router from '../utils/router.js';
import Footer from '../components/footer.js';

export default function() {
  const template = $('.index-page.page', 
    $('section.hero', $('.container', 
      $('img', { src: 'src/assets/img/logo-full.png' }),
      $('.title', 'A small and flexible Javascript library for building user interfaces.'),
      $('.cta',
        $('button.primary', 'Get Started', { $click: ev => Router.push('/docs') }),
        $('button.primary', 'Tutorial', { $click: ev => Router.push('/tutorial') }),
      )
    )),
    $('section.features', $('.container', 
      $('.feature',
        $('.feature-title', 'Small'),
        $('.feature-text', 'All features you expect from a modern framework in a very small package. < 10 kb gzipped.')
      ),
      $('.feature',
        $('.feature-title', 'Flexible'),
        $('.feature-text', 'Uses a simple interface. Write your components in plain Javascript and build interfaces your own way.')
      ),
      $('.feature',
        $('.feature-title', 'No virtual DOM'),
        $('.feature-text', 'No compilation, no virtual DOM and a small runtime means your apps are small and fast.')
      )
    )),
    Footer()
  );

  return render({ template });
}
