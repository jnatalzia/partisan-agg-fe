import { populateArticles } from "./components/articles";
import { attachListeners } from "./components/event_handlers";
import { initializeSideMenu } from "./components/sidemenu";
import { getBiasSelection } from "./utils/storage";
import { biasSelectionToObj } from "./utils/lens";

window.addEventListener('load', () => {
  initializeSideMenu();
  attachListeners();
  populateArticles(biasSelectionToObj(getBiasSelection()));
});