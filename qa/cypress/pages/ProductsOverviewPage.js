import {Page} from './Page';
import * as httpRoutes from '../fixtures/httpRoutes.json';

class ProductsOverviewPage extends Page {

  constructor() {
    super(httpRoutes.ed.OverviewPath, ignoreHttpCode);
  }
}

export {ProductsOverviewPage};
