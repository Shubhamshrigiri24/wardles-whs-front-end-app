import {ProductSelectionAndOverviewPage} from '../pages/ProductSelectionAndOverviewPage';
import * as httpRoutes from '../fixtures/httpRoutes.json';

let productPage = new ProductSelectionAndOverviewPage(false);

context('ED product selection spec', () => {
  beforeEach(() => {
    productPage.open_page();
  })

  it ('Selects "Sildenafil" and checks that all the quantities can be selected', () => {
    productPage.select_product_from_side_bar('Sildenafil');

    productPage.select_product_strength('50 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £14.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £14.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £14.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £14.99');

    productPage.click_continue_to_checkout_button()
    .check_url_path_contains_text('/online/ed/checkout/your-details');
  })

  it ('Selects "Viagra Connect" and checks that all the quantities can be selected', () => {

    productPage.select_product_from_side_bar('Viagra Connect');

    productPage.select_product_strength('50 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £19.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £34.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £51.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £67.99');

    productPage.click_continue_to_checkout_button()
    .check_url_path_contains_text('/online/ed/checkout/your-details');
  })

  it ('Selects "Tadalafil" and checks that all the quantities can be selected', () => {

    productPage.select_product_from_side_bar('Tadalafil');

    productPage.select_product_strength('10 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £24.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £41.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £59.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £75.99');

    productPage.select_product_strength('20 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £27.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £49.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £64.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £81.99');

    productPage.click_continue_to_checkout_button()
    .check_url_path_contains_text('/online/ed/checkout/your-details');
  })

  it ('Selects "Cialis" and checks that all the quantities can be selected', () => {

    productPage.select_product_from_side_bar('Cialis');

    productPage.select_product_strength('10 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £40.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £76.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £114.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £151.99');

    productPage.select_product_strength('20 mg');

    productPage.select_product_pack_size('4 tablets');
    productPage.check_product_price_is('Price: £45.99');

    productPage.select_product_pack_size('8 tablets');
    productPage.check_product_price_is('Price: £87.99');
    
    productPage.select_product_pack_size('12 tablets');
    productPage.check_product_price_is('Price: £125.99');

    productPage.select_product_pack_size('16 tablets');
    productPage.check_product_price_is('Price: £159.99');

    productPage.click_continue_to_checkout_button()
    .check_url_path_contains_text('/online/ed/checkout/your-details');
  })
})
