const ARTICLES_READ_LS = 'articlesRead';
const ARTICLE_LIFE_DAY = 1;
const ARTICLE_LIFE_MS = ARTICLE_LIFE_DAY * 24 * 60 * 60 * 1000;

const BIAS_SELECTED_LS = 'biasSelected';

export function setArticleRead(articleID) {
  let articlesRead = localStorage.getItem(ARTICLES_READ_LS);
  if (!articlesRead) {
    articlesRead = {};
  } else {
    articlesRead = JSON.parse(articlesRead);
  }
  
  if (articlesRead[articleID]) {
    return;
  }
  articlesRead[articleID] = Date.now();
  localStorage.setItem(ARTICLES_READ_LS, JSON.stringify(articlesRead));
}

function setArticlesRead(articles) {
  localStorage.setItem(ARTICLES_READ_LS, JSON.stringify(articles));
}

export function getReadArticles() {
  let articlesRead = localStorage.getItem(ARTICLES_READ_LS);
  if (!articlesRead) {
    articlesRead = {};
  } else {
    articlesRead = JSON.parse(articlesRead);
  }
  
  // clear out old ones
  let allKeys = Object.keys(articlesRead);
  let articlesAltered = false;
  for (let i = 0; i < allKeys.length; i++) {
    // Delete anything old than TIME old
    let value = articlesRead[allKeys[i]];
    if (Date.now() - value > ARTICLE_LIFE_MS){
      articlesAltered = true;
      delete articlesRead[allKeys[i]];
    }
  }
  if (articlesAltered) {
    setArticlesRead(articlesRead);
  }

  return articlesRead;
}

export function setBiasSelection(val) {
  return localStorage.setItem(BIAS_SELECTED_LS, val);
}

export function getBiasSelection() {
  return localStorage.getItem(BIAS_SELECTED_LS);
}