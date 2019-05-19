export function fetchArticles(page = 0) {
  return fetch('//' + window.location.hostname + ':8080/get_feed').then(res => {
    return res.json();
  }).catch(err => {
    console.log('There was an error fetching the resource');
    console.log(err);
  });
}