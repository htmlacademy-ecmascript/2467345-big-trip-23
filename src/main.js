
import Presenter from './presenter/presenter.js';
const siteMainElement = document.querySelector('.main');
const presenter = new Presenter({boardContainer: siteMainElement});
presenter.init();
