import { getBiasSelection, setBiasSelection } from "../utils/storage";
import { populateArticles } from "./articles";
import { getIndexFromOption, validateLens, biasSelectionToObj, getNextLens, getPrevLens } from "../utils/lens";

let sideMenu;
let leanLabel;
let currentLens;
let prevLens;

function setLens(lens) {
  lens = validateLens(lens);
  setBiasSelection(lens);
  currentLens = lens;
  leanLabel.innerText = lens;
  updateBars();
}

function updateBars() {
  let bars = Array.prototype.slice.call(document.querySelectorAll('.js-lean-graph-bar'), 0);
  let expectedSplit = biasSelectionToObj(currentLens);
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
      // Could make this not look up the lens each time but shrug
      let upcomingLens = dir === 'r' ? getNextLens(currentLens) : getPrevLens(currentLens);
      setLens(upcomingLens);
    });
  });
}

export function initializeSideMenu() {
  sideMenu = document.querySelector('.js-sidemenu');
  document.querySelector('.js-close-sidemenu').addEventListener('click', closeSideMenu);
  initializeArrowListeners();
  leanLabel = document.querySelector('.js-lean-label');
  const biasSelection = getBiasSelection();
  // We already get the articles on load in `main`, no need to rerequest
  prevLens = biasSelection;
  setLens(biasSelection);
}

export function toggleSideMenu() {
  sideMenu.classList.contains('sidemenu--open') ? 
    closeSideMenu() : openSideMenu();
}

function closeSideMenu() {
  if (prevLens !== currentLens) {
    populateArticles(biasSelectionToObj(currentLens));
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