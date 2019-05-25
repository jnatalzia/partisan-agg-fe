export function fetchArticles(lens, page = 0) {
  let query = '';
  if (lens) {
    query = Object.keys(lens).reduce((acc, currVal, idx) => {
      acc += idx === 0 ? '?rs=' : ',';
      acc += currVal + lens[currVal];
      return acc
    }, '');
  }
  return fetch('//' + window.location.hostname + ':8080/get_feed' + query).then(res => {
    return res.json();
  }).catch(err => {
    console.log('There was an error fetching the resource');
    console.log(err);
  });
}