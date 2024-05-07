// eslint-disable-next-line check-file/filename-naming-convention
import Presenter from './presenter/presenter.js';
import PointModel from '../model/PointModel.js';
const siteMainElement = document.querySelector('.main');
const presenter = new Presenter({boardContainer: siteMainElement});
presenter.init();
const pointModel = new PointModel();
pointModel.init();
