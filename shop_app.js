import {Shop} from './shop.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const shop_el = document.getElementById('shop_app');
    let shop = new Shop(shop_el);
    shop.init();
})