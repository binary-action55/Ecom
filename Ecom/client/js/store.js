const cartModal = document.querySelector('.cartModal');
const cartBtn = document.querySelector('.cartButton');
const closeCart = document.querySelector('.closeCart');

cartBtn.addEventListener('click',()=>{
    cartModal.classList.remove('hide');
});

closeCart.addEventListener('click',()=>{
    cartModal.classList.add('hide');
})

