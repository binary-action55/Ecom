const cartModal = document.querySelector('.cartModal');
const productContent = document.querySelector('.productContent');
const toastContainer = document.querySelector('.toastContainer');
const cartTotalContent = document.querySelector('#cartTotalContent');

// List divs
const foodList = document.querySelector('#foodList');
const drinkList  = document.querySelector('#drinkList');
const cartItemListContents = document.querySelector('#cartItemListContents');

// Buttons
const cartBtn = document.querySelector('.cartButton');
const orderBtn = document.querySelector('.orderButton');
const closeCart = document.querySelector('.closeCart');

//Page Navigators
const pageNavigatorFood = document.querySelector('#pageNavigatorFood');
const pageNavigatorDrinks = document.querySelector('#pageNavigatorDrinks');
const pageNavigatorCart = document.querySelector('#pageNavigatorCart');


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


async function getCartPageList (currentPage) {
    const res = await axios.get('http://localhost:3000/product/cart',{params:{page:currentPage}});
    cartItemListContents.innerHTML = "";
    pageNavigatorCart.innerHTML="";
    
    for(let item of res.data.cartItemList){
        createCartItems(item);
    }
    if(res.data.cartItemList.length>0)
        orderBtn.classList.remove('hide');
    createPageNavigation(res.data,'cart');
    cartTotalContent.innerText = `Total:${res.data.cartTotal}`;
    cartModal.classList.remove('hide');
}

function createProductList(products,category){
    let productList;
    if(category==='food')
        productList = foodList;
    else
        productList = drinkList;
    
    productList.innerHTML='';

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

        productList.appendChild(productListItem);
    }
}

function createPageNavigation(data,category){
    if(!(data.hasPreviousPage || data.hasNextPage))
        return;
    let pageNavigator;
    if(category==='food')
        pageNavigator=pageNavigatorFood;
    else if(category==='drink')
        pageNavigator=pageNavigatorDrinks;
    else
        pageNavigator=pageNavigatorCart;

    pageNavigator.innerHTML = "";
    if(data.hasPreviousPage)
    {
        const button = document.createElement('button');
        button.setAttribute('class','pageNavigationButton');
        button.setAttribute('data-page',data.currentPage-1);
        button.innerText = data.currentPage-1;
        pageNavigator.appendChild(button);
    }

    const button = document.createElement('button');
    button.setAttribute('class','pageNavigationButton');
    button.setAttribute('data-page',data.currentPage);
    button.innerText = data.currentPage;
    pageNavigator.appendChild(button);

    if(data.hasNextPage)
    {
        const button = document.createElement('button');
        button.setAttribute('class','pageNavigationButton');
        button.setAttribute('data-page',data.currentPage+1);
        button.innerText = data.currentPage+1;
        pageNavigator.appendChild(button);
    }
}

async function getProductListPage(currentPage,category){
    const res = await axios.get('http://localhost:3000/product/',{params:{page:currentPage,category}});
    createProductList(res.data.products,category);
    createPageNavigation(res.data,category);
}

function toastMessage(msg){
    const toast = document.createElement('div');
    toast.setAttribute('class','toast');
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    setTimeout(()=>toast.remove(),4000);
}

// Event Listeners

cartBtn.addEventListener('click', async (e)=>{
    getCartPageList(1);
});

closeCart.addEventListener('click',(e)=>{
    cartModal.classList.add('hide');
    orderBtn.classList.add('hide');
});

orderBtn.addEventListener('click', async (e)=>{
    try{
        const res = await axios.post('http://localhost:3000/product/order');
        cartModal.classList.add('hide');
        orderBtn.classList.add('hide');
        const msg = `Order successfully placed with OrderId ${res.data.orderId}`;
        toastMessage(msg);
    }
    catch(err){
        console.log(err);
        return;
    }
});

productContent.addEventListener('click',async (e)=>{
    if(!(e.target.classList.contains("productPurchase")))
        return;    
    const parent = e.target.parentElement;
    const product = parent.dataset;
    cartModal.classList.add('hide');
    orderBtn.classList.add('hide');
    try{
        await axios.post('http://localhost:3000/product/cart',{id:product.id,quantity:1});
        const msg = `Your product: ${product.name} is added to cart `
        toastMessage(msg);
    }
    catch(err){console.error(err);}
});

pageNavigatorFood.addEventListener('click',(e)=>{
    if(e.target.classList.contains('pageNavigationButton'))
        getProductListPage(+e.target.dataset.page,'food');
});

pageNavigatorDrinks.addEventListener('click',(e)=>{
    if(e.target.classList.contains('pageNavigationButton'))
        getProductListPage(+e.target.dataset.page,'drink');
});

pageNavigatorCart.addEventListener('click',(e)=>{
    if(e.target.classList.contains('pageNavigationButton'))
        getCartPageList(+e.target.dataset.page);
});

document.addEventListener('DOMContentLoaded', ()=>{
    getProductListPage(1,"food");
    getProductListPage(1,"drink");
})