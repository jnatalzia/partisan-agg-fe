export function fetchArticles(page = 0) {
  return fetch('/fixture.json').then(res => {
    return res.json();
  }).catch(err => {
    console.log('There was an error fetching the resource');
    console.log(err);
  });
}