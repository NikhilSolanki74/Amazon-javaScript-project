export const cart =[{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(itemId){
    let matchingitem;
    cart.forEach((item) =>{
        if(item.productId === itemId){
           matchingitem=item;
        }
    } )
    if(matchingitem){
        matchingitem.quantity += 1;
    } 
    else{
        cart.push({
            productId: itemId,
            quantity: 1
 })
}
}


export function updateCartQuantity(){
    let cartQuantity=0;
 
        cart.forEach((item) =>{
            cartQuantity+=item.quantity;
        })
        document.querySelector('.cquantity').innerHTML=cartQuantity;
}