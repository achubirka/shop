export class ProductList {
    el;
    products;
    cart;

    constructor(el, products, cart) {
        this.el = el;
        this.products = products;
        this.cart = cart;

        console.log('jkhjhk',el);
        
        this.init();
    }


    init() {
        this.render();
        this.setActions();
    }

    setActions() {
        this.el.addEventListener('click', (e) => {
            let data = e.target.dataset;

            if (data.action === 'add') {
                this.addProduct(data.id);
            }
            
        });

        this.cart.on('cart_update', this.render.bind(this));
    }

    addProduct(id) {
        this.cart.addProduct(id);
    }

    render() {

        this.el.innerHTML = this.products.map(product => {
            let count = this.cart.getProductCount(product.id);
            console.log(+product.available); 
            let disabled = (!product.available || product.available <= count) ? 'disabled' : '';
            return `
            
                <div>
                    <div>${product.name}</div>
                    <div>${product.price}</div>
                    <div>
                        <button 
                            data-action="add" 
                            data-id="${product.id}"
                            ${disabled} >Add
                        </button>
                    </div>
                </div>
            
            `;
        }).join('');

    };


}