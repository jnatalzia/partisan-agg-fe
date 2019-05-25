import { populateArticles } from "./components/articles";
import { attachListeners } from "./components/event_handlers";
import { initializeSideMenu } from "./components/sidemenu";

window.addEventListener('load', () => {
  initializeSideMenu();
  attachListeners();
  populateArticles();
});