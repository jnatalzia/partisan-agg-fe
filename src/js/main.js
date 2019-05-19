import { fetchArticles } from './utils/resource_fetcher';
import { attemptURIDecode, removeHTMLTags } from './utils/formatter';
import { setArticleRead, getReadArticles } from './utils/storage';
import { createdAtToTS } from './utils/date';

const lastArticleIDStorage = 'lastArticleID';

function checkScroll() {
  let laID = localStorage.getItem(lastArticleIDStorage);

  if (laID) {
    let el = document.querySelector('[data-id="' + laID + '"');
    localStorage.removeItem(lastArticleIDStorage)
    if (el) {
      window.scrollTo(0, el.offsetTop);
    }
  }
}

let articlesRead = getReadArticles();

window.addEventListener('load', () => {
  let articleContainer = document.createElement('div');
  articleContainer.classList.add('articles-container');

  fetchArticles().then((res) => {
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
      leanEl.classList.add(`article__partisan-lean--${article.partisan_lean.toLowerCase()}`);
      el.classList.add(`article--${article.partisan_lean.toLowerCase()}`);

      let formattedPreview = removeHTMLTags(attemptURIDecode(article.article_preview));
      el.querySelector('.js-description').innerText = formattedPreview;

      el.setAttribute('href', article.article_url);
      el.setAttribute('data-id', article.id);

      if (articlesRead[article.id]) {
        el.classList.add('article--read')
      }

      let ts = createdAtToTS(article.created_at);
      let timeDiff = Date.now() - ts;

      let hoursAgo = timeDiff / 1000 / 60 / 60;
      
      let createdAtInfo = Math.floor(hoursAgo) + ' hours ago';
      if (hoursAgo < 1) {
        let minutesAgo = hoursAgo * 60;
        createdAtInfo = Math.floor(minutesAgo) + ' minutes ago';
      }

      el.querySelector('.js-created-at').innerText = createdAtInfo;

      el.addEventListener('click', e => {
        e.preventDefault();
        let articleID = e.currentTarget.getAttribute('data-id');
        setArticleRead(articleID);
        localStorage.setItem(lastArticleIDStorage, articleID);
        window.location.href = e.currentTarget.getAttribute('href');
      });

      articleContainer.appendChild(el);
    });

    document.body.appendChild(articleContainer);

    requestAnimationFrame(checkScroll);
  });
});