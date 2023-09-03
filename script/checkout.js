import {cart,deleteCartProduct} from '../data/cart.js'
import {products} from '../data/products.js'
import {mony} from './utills/money.js';
let cartSummaryHTML='';


newPrice();
cart.forEach((cartItem)=>{

const prodId= cartItem.productId;
let match;
products.forEach((prod)=>{
    if(prod.id === prodId){
        match=prod;
        
    }
})

cartSummaryHTML +=`
<div class="cart-item-container js-delete-item-${match.id}">
    <div class="delivery-date">
    Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
    <img class="product-image"
        src="${match.image}">

    <div class="cart-item-details">
        <div class="product-name">
        ${match.name}
        </div>
        <div class="product-price">
        $ ${mony(match.priceCents)}
        </div>
        <div class="product-quantity">
        <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
            Update
        </span>
        <span class="delete-quantity-link link-primary jsdelete" data-product-Id="${match.id}">
            Delete
        </span>
        </div>
    </div>

    <div class="delivery-options">
        <div class="delivery-options-title">
        Choose a delivery option:
        </div>
        <div class="delivery-option">
        <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${match.id}">
        <div>
            <div class="delivery-option-date">
            Tuesday, June 21
            </div>
            <div class="delivery-option-price">
            FREE Shipping
            </div>
        </div>
        </div>
        <div class="delivery-option">
        <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${match.id}">
        <div>
            <div class="delivery-option-date">
            Wednesday, June 15
            </div>
            <div class="delivery-option-price">
            $4.99 - Shipping
            </div>
        </div>
        </div>
        <div class="delivery-option">
        <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${match.id}">
        <div>
            <div class="delivery-option-date">
            Monday, June 13
            </div>
            <div class="delivery-option-price">
            $9.99 - Shipping
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
`;
});

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

document.querySelectorAll('.jsdelete').forEach((link) =>{
    link.addEventListener('click' ,()=>{
        const kk=link.dataset.productId
        deleteCartProduct(kk);
        
        const container=document.querySelector(`.js-delete-item-${kk}`);
        container.remove();
        newPrice();
        // console.log(cart)
    })

})



export function newPrice(){
    var pobj={
        totalItems: 0 ,
        totalPrice:0,
        shiping:0 ,
        beforeTax:0 ,
        tax:0 ,
        orderTotal:0
    }
cart.forEach((item)=>{
    pobj.totalItems+=item.quantity;
    pobj.shiping+=200
 
    products.forEach((prd)=>{
        if(prd.id===item.productId){
              pobj.totalPrice+=prd.priceCents * item.quantity;

        }
    })


})
pobj.beforeTax=pobj.shiping+pobj.totalPrice;
pobj.tax=pobj.beforeTax*(10/100);
pobj.orderTotal=pobj.beforeTax + pobj.tax;



document.querySelector('.payhtml').innerHTML=`<div class="payment-summary-title">
Order Summary
</div>

<div class="payment-summary-row">
<div>Items (${pobj.totalItems}) :</div>
<div class="payment-summary-money">$${mony(pobj.totalPrice)}</div>
</div>

<div class="payment-summary-row">
<div>Shipping &amp; handling:</div>
<div class="payment-summary-money">$${mony(pobj.shiping)}</div>
</div>

<div class="payment-summary-row subtotal-row">
<div>Total before tax:</div>
<div class="payment-summary-money">$${mony(pobj.beforeTax)}</div>
</div>

<div class="payment-summary-row">
<div>Estimated tax (10%):</div>
<div class="payment-summary-money">$${mony(pobj.tax)}</div>
</div>

<div class="payment-summary-row total-row">
<div>Order total:</div>
<div class="payment-summary-money">$${mony(pobj.orderTotal)}</div>
</div>

<button class="place-order-button button-primary">
Place your order
</button>`

}
