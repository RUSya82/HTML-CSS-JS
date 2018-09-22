"use strict";

const cart = {
    settings: {
        countSelector: "basketCount",
        priceSelector: "basketPrice",
        wrapperID: "container",
        cleanButton: "cleanCart",
    },
    goods: [],  //массив в купленными товарами

    init(userSettings = {}){
        Object.assign(this.settings, userSettings);

        document
            .getElementById(this.settings.wrapperID)
            .addEventListener('click', event => this.clickFunction(event));
        document
            .getElementById(this.settings.cleanButton)
            .addEventListener('click', event => this.cleanFunction(event));
    },
    cleanFunction(event){
        this.goods = [];
        this.render();
    },
    render(){
        let countTag = document.querySelector(this.settings.countSelector);
        let priceTag = document.querySelector(this.settings.priceSelector);
        console.log(countTag, priceTag);
        let cartData = this.getGoodsPrice();
        countTag.innerText = cartData.count;
        priceTag.innerText = cartData.price;
    },
    clickFunction(event){
        if(event.target.tagName != 'BUTTON'){
            return;
        }
        this.add(event.target.dataset.name, event.target.dataset.price);
        console.log(this.goods);
        this.render();
    },
    add(goodName, goodPrice){
        let item = { goodName, goodPrice};
        this.goods.push(item);

    },

    getGoodsPrice(){
        let cartData = {
            count: 0,
            price: 0,
        }
        for(let i of this.goods){
            cartData.price += +i.goodPrice;
            cartData.count++;
        }
        return cartData;
    }
}
window.onload = () => cart.init({countSelector: '#cartCount', priceSelector:'#cartPrice'});