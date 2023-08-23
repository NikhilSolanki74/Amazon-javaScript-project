export const cart =[];

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