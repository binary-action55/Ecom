const cartModal = document.querySelector('.cartModal');
const cartBtn = document.querySelector('.cartButton');
const closeCart = document.querySelector('.closeCart');
const productContent = document.querySelector('.productContent');
const cartItemList = document.querySelector('.cartItemList');
const toastContainer = document.querySelector('.toastContainer');

cartBtn.addEventListener('click',()=>{
    cartModal.classList.remove('hide');
});

closeCart.addEventListener('click',()=>{
    cartModal.classList.add('hide');
})

productContent.addEventListener('click',(e)=>{
    const parent = e.target.parentElement;
    const product = parent.dataset;
    console.log(product);
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartRow');
    cartItem.innerHTML = `
    <span class="cartColumn">
        <img class="cartItemImage"
            src="${product.imgurl}" />
        <span class="cartItemName">${product.name}</span>
    </span>
    <span class="cartColumn">
        <span class="cartItemPrice">${product.price}</span>
    </span>
    <span class="cartColumn">
        <span class="cartItemQty">1</span>
    </span>
    `;
    cartItemList.appendChild(cartItem);

    const toast = document.createElement('div');
    toast.setAttribute('class','toast');
    toast.innerText = `Your product: ${product.name} is added to cart `;
    toastContainer.appendChild(toast);
    setTimeout(()=>toast.remove(),4000);
})

