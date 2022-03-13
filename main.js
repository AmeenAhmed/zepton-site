import 'normalize.css';
import './src/vendor/fa/css/all.min.css';
import './src/assets/scss/main.scss'; 
import './src/vendor/prismjs/prism.js';
import './src/vendor/prismjs/onedark.css';
import { createApp, render, $ } from 'zepton';
import Header from './src/components/header.js';
import RouterView from './src/components/router-view.js';
import IndexPage from './src/pages/index.js';
import DocsPage from './src/pages/docs.js';
import PlaygroundPage from './src/pages/playground.js';
import $404Page from './src/pages/404.js';
import TutorialPage from './src/pages/tutorial.js';
import ExamplesPage from './src/pages/examples.js';

function layout() {
  const pages = {
    '/': IndexPage,
    '/docs': DocsPage,
    '/playground': PlaygroundPage,
    '/tutorial': TutorialPage,
    '/examples': ExamplesPage,
    '404': $404Page
  };

  Prism.plugins.NormalizeWhitespace.setDefaults ({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
  });

  const template = $('.zepton-site', 
    Header(),
    RouterView({ pages }),
  );

  return render({ template });
}


createApp({
  root: '#app',
  component: layout
});
