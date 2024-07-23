export class Cart {
    el;
    products;
    products_obj = {};
    cart = {};

    constructor(el, products) {
        this.el = el;
        this.products = products;
        this.init();
    }

    init() {
        this.loadFromStorage();

        for (let product of this.products) {
            this.products_obj[product.id] = product;
        }

        this.render();
        this.setActions();
    }

    saveToStorage() {
        localStorage.setItem('Shop.cart', JSON.stringify(this.cart));
        this.render();
        this.el.dispatchEvent(new Event('cart_update'))
    }

    loadFromStorage() {
        this.cart = JSON.parse(localStorage.getItem('Shop.cart')) || {};
    }

    addProduct(id) {
        if (this.cart[id] === undefined) {
            this.cart[id] = 0;
        }

        this.plusProduct(id);
    }

    plusProduct(id) {
        let product = this.products_obj[id];
        if (product.available > this.cart[id]) {
            this.cart[id]++;
        }

        this.saveToStorage()
    }
    
    
    minusProduct(id) {
        this.cart[id]--;
        
        if (this.cart[id] <= 0) {
            this.removeProduct(id);
        }            

        this.saveToStorage()
    }

    removeProduct(id) {
        delete this.cart[id];

        this.saveToStorage();
    }

    setActions() {
        this.el.addEventListener('click', (e) => {
            let data = e.target.dataset;

            switch(data.action) {
                case 'plus':
                    this.plusProduct(data.id);
                    break;
                case 'minus':
                    this.minusProduct(data.id);
                    break;
            }
        });
    }

    getProductCount(id) {
        return this.cart[id];
    }

    getTotalPrice() {
        return Object.keys(this.cart).reduce((acc, productId) => {
            let product = this.products_obj[productId];
            let count = this.cart[productId];
            return (acc + (product.price * count));
        }, 0).toFixed(2)
    }

    getTotalCount() {
        return Object.values(this.cart).reduce((acc, count) => {
            return acc + count;
        }, 0)
    }

    render() {
        let totalPrice = this.getTotalPrice();
        let totalCount = this.getTotalCount();
        this.el.innerHTML = 
        `<div> Cart(${totalCount}) </div>` +
        Object.keys(this.cart).map(productId => {
            let product = this.products_obj[productId];
            let count = this.cart[productId];
            let disabled = (product.available <= count) ? 'disabled': '';
            return `
                <div>
                    <div>${product.name}</div>
                    <div>${product.price} x ${count}</div>
                    <div>
                        <button data-action="minus" data-id="${productId}">-</button>
                        <button data-action="plus" data-id="${productId}" ${disabled}>+</button>
                    </div>
                </div>
            `;
        }).join('') + `
            <div>Total ${totalPrice}</div>
        `;
    }

    on(event, fn) {
        this.el.addEventListener(event, fn);
    }
}
