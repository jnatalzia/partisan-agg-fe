const decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(_, dec) {
    return String.fromCharCode(dec);
  });
};

export function attemptURIDecode(str) {
  try {
    return decodeHtmlEntity(decodeURIComponent(str));
  } catch(e) {
    return str;
  }
}

export function removeHTMLTags(str) {
  return str.replace(/<(?:.|\n)*?>/gm, '');
}