import { fetchArticles } from './utils/resource_fetcher';
import { attemptURIDecode } from './utils/formatter';

window.addEventListener('load', () => {
  let articleContainer = document.createElement('div');
  articleContainer.classList.add('articles-container');

  fetchArticles().then((res) => {
    console.log(res);
    const articleTemplate = document.querySelector('.js-article-template');
  
    res.items.forEach(article => {
      let el = articleTemplate.cloneNode(true);
      // TODO: pick the right thumb
      let thumb = article.thumbnails[0];
      if (thumb) {
        el.querySelector('.js-thumb').style['background-image'] = `url(${thumb.url})`;
      } else {
        el.querySelector('.js-thumb').remove();
      }

      el.querySelector('.js-title').innerText = attemptURIDecode(article.article_title);
      el.querySelector('.js-author').innerText = article.org_name;
      let leanEl = el.querySelector('.js-partisan-lean')
      leanEl.innerText = article.partisan_lean;
      leanEl.classList.add(`article__partisan-lean--${article.partisan_lean.toLowerCase()}`)

      let formattedPreview = attemptURIDecode(article.article_preview);
      el.querySelector('.js-description').innerText = formattedPreview;

      el.setAttribute('href', article.article_url);

      articleContainer.appendChild(el);
    });

    document.body.appendChild(articleContainer);
  });
});