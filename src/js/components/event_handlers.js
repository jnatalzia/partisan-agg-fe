import { toggleSideMenu } from "./sidemenu";

export function attachListeners() {
  let menuOpenEl = document.querySelector('.js-open-menu');
  menuOpenEl.addEventListener('click', toggleSideMenu);
}