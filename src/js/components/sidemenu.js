import { getBiasSelection, setBiasSelection } from "../utils/storage";
import { populateArticles } from "./articles";

let sideMenu;
let leanLabel;
let currentLens;
let prevLens;
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
  }
}

let selectOptions = Object.keys(lenses);

function setLens(lens) {
  if (!lens) {
    lens = selectOptions[0];
  }
  setBiasSelection(lens);
  currentLens = lens;
  leanLabel.innerText = lens;
  updateBars();
}

window.setLens = setLens;

function updateBars() {
  let bars = Array.prototype.slice.call(document.querySelectorAll('.js-lean-graph-bar'), 0);
  let expectedSplit = lenses[currentLens];
  bars.forEach(b => {
    let scaleVal = parseInt(expectedSplit[b.getAttribute('data-lean')]) / 100;
    b.style.transform = `scaleY(${scaleVal})`;
  });
}

function initializeArrowListeners() {
  let arrs = Array.prototype.slice.call(document.querySelectorAll('.js-lean-arrow'), 0);
  arrs.forEach(a => {
    let dir = a.getAttribute('data-dir');
    a.addEventListener('click', () => {
      console.log(dir);
      // Could make this not look up the lens each time but shrug
      let currentIndex = selectOptions.indexOf(currentLens);
      if (dir === 'r') {
        currentIndex = (currentIndex + 1) % selectOptions.length;
      } else {
        currentIndex = currentIndex - 1
        if (currentIndex < 0) {
          currentIndex = selectOptions.length - 1;
        }
      }

      setLens(selectOptions[currentIndex]);
    });
  });
}

export function initializeSideMenu() {
  sideMenu = document.querySelector('.js-sidemenu');
  document.querySelector('.js-close-sidemenu').addEventListener('click', closeSideMenu);
  initializeArrowListeners();
  leanLabel = document.querySelector('.js-lean-label');
  setLens(getBiasSelection());
}

export function toggleSideMenu() {
  sideMenu.classList.contains('sidemenu--open') ? 
    closeSideMenu() : openSideMenu();
}

function closeSideMenu() {
  if (prevLens !== currentLens) {
    populateArticles(lenses[currentLens]);
    window.scrollTo(0, 0);
    prevLens = currentLens;
  }
  
  sideMenu.classList.remove('sidemenu--open');
  document.body.classList.remove('no-scroll');
}

function openSideMenu() {
  sideMenu.classList.add('sidemenu--open')
  document.body.classList.add('no-scroll');
}