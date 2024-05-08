// eslint-disable-next-line check-file/filename-naming-convention
import Presenter from './presenter/presenter.js';
import PointModel from '../model/PointModel.js';
const siteMainElement = document.querySelector('.trip-main');
const pointModel = new PointModel();
pointModel.init();
const presenter = new Presenter({boardContainer: siteMainElement, pointModel});
presenter.init();
