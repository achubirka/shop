import {ProductList} from './product_list.js';
import {Cart} from './cart.js';


const PRODUCTS_LINK = 'http://my-json-server.typicode.com/achubirka/db/products';
export class Shop {
    el;
    product_list_el;
    cart_el;
    product_list;
    cart;
    products = [];
    
    constructor(el) {
        this.el = el;
        //alert('INIT');
    }

    init() {
        this.product_list_el = this.el.querySelector('.js_product_list');
        this.cart_el = this.el.querySelector('.js_cart');

        this.loadProducts().then((data) => {
            this.products = data;
            console.log(data);
            this.cart = new Cart(this.cart_el, this.products);
            this.product_list = new ProductList(this.product_list_el, this.products, this.cart);
            this.setActions();
        }).catch((e) => {
            console.error(e);
        })
    }

    setActions() {
        window.addEventListener('storage', (e) => {
            console.log(e.key);
            this.cart.loadFromStorage();
            this.cart.render();
            this.product_list.render();

        });
    }

    loadProducts() {
        return fetch(PRODUCTS_LINK).then(res => res.json())
    }


}