const cartModal = document.querySelector('.cartModal');
const cartBtn = document.querySelector('.cartButton');
const closeCart = document.querySelector('.closeCart');
const productContent = document.querySelector('.productContent');
const toastContainer = document.querySelector('.toastContainer');
const foodList = document.querySelector('#foodList');
const drinkList  = document.querySelector('#drinkList');
const cartItemListContents = document.querySelector('#cartItemListContents');
const cartTotalContent = document.querySelector('#cartTotalContent');

function createCartItems(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartRow');
    cartItem.dataset.id = product.id;
    cartItem.innerHTML = `
    <span class="cartColumn">
        <img class="cartItemImage"
            src="${product.imageURL}" />
        <span class="cartItemName">${product.name}</span>
    </span>
    <span class="cartColumn">
        <span class="cartItemPrice">${product.price}</span>
    </span>
    <span class="cartColumn">
        <span class="cartItemQty">${product.quantity}</span>
    </span>
    `;
    cartItemListContents.appendChild(cartItem);
}


cartBtn.addEventListener('click', async (e)=>{
    const res = await axios.get('http://localhost:3000/product/cart');
    cartItemListContents.innerHTML = "";
    for(let item of res.data.cartItemList){
        createCartItems(item);
    }
    cartTotalContent.innerText = `Total:${res.data.cartTotal}`;
    cartModal.classList.remove('hide');
});

closeCart.addEventListener('click',(e)=>{
    cartModal.classList.add('hide');
})

productContent.addEventListener('click',async (e)=>{
    if(!(e.target.classList.contains("productPurchase")))
        return;    
    const parent = e.target.parentElement;
    const product = parent.dataset;
    cartModal.classList.add('hide');
    try{
        await axios.post('http://localhost:3000/product/cart',{id:product.id,quantity:1});
        const toast = document.createElement('div');
        toast.setAttribute('class','toast');
        toast.innerText = `Your product: ${product.name} is added to cart `;
        toastContainer.appendChild(toast);
        console.log("toast",toast);
        setTimeout(()=>toast.remove(),4000);
    }
    catch(err){console.error(err);}
});

function createProductList(products){
    for(let product of products){
        const productListItem = document.createElement('article');
        productListItem.classList.add('productDisplay');
        productListItem.dataset.id = product.id;
        productListItem.dataset.name = product.name;
        productListItem.dataset.price = product.price;
        productListItem.dataset.imageURL = product.imageURL;
        productListItem.dataset.description = product.description;
        productListItem.dataset.category = product.category;

        productListItem.innerHTML = `
        <h3 class="productName">${product.name}</h3>
        <img class="productImage"
            src=${product.imageURL} />
        <span class="productPrice" class="price">${product.price}$</span>
        <button class="productPurchase" class="abtn">Add to cart</button>
        `;

        if(product.category === 'food')
            foodList.appendChild(productListItem);
        else
            drinkList.appendChild(productListItem);
    }
}

document.addEventListener('DOMContentLoaded', async ()=>{
    const res = await axios.get('http://localhost:3000/product/');
    createProductList(res.data);
})

