let lenses = {
  "Balanced": {
    LL: 20,
    L: 20,
    C: 20,
    R: 20,
    RR: 20
  },
  "Staunch Conservative": {
    LL: 0,
    L: 10,
    C: 30,
    R: 30,
    RR: 30
  },
  "Staunch Liberal": {
    LL: 30,
    L: 30,
    C: 30,
    R: 10,
    RR: 0
  },
  "Reinforce My Beliefs": {
    LL: 70,
    L: 30,
    C: 0,
    R: 0,
    RR: 0
  },
  "One Article From Alt-Right": {
    LL: 0,
    L: 0,
    C: 0,
    R: 30,
    RR: 70
  },
  "Graham Bell (Curve)": {
    LL: 10,
    L: 25,
    C: 30,
    R: 25,
    RR: 10
  }
}

let selectOptions = Object.keys(lenses);

export function biasSelectionToObj(selection) {
  return lenses[selection];
}

export function validateLens(lens) {
  if (!lens || !lenses[lens]) {
    return selectOptions[0];
  }

  return lens;
}

export function getOptionFromIndex(idx) {
  return selectOptions[idx];
}

function getIndexFromOption(opt) {
  return selectOptions.indexOf(opt);
}

export function getNextLens(current) {
  let currentIndex = getIndexFromOption(current);
  currentIndex = (currentIndex + 1) % selectOptions.length;
  return getOptionFromIndex(currentIndex);
}

export function getPrevLens(current) {
  let currentIndex = getIndexFromOption(current);
  currentIndex = currentIndex - 1
  if (currentIndex < 0) {
    currentIndex = selectOptions.length - 1;
  }
  return getOptionFromIndex(currentIndex);
}