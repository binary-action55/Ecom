const mainBody = document.querySelector('.mainContent');


function createOrderList(orderDetails){
    for(let order of orderDetails)
    {
        const orderDisplay = document.createElement('article');
        orderDisplay.classList.add('orderDisplay');
        let productListString='';
        for(let product of order.products){
            productListString +=`<li>Product Name: ${product.name} Qty: ${product.quantity}</li>`
        }

        const date = order.date.replace('T',' ').slice(0,19);
        orderDisplay.innerHTML = `
        <span class="orderId" id="orderId">Order Id:${order.id}</span>
        <span class="orderDate" id="">Dated : ${date}</span>
        <ul class="orderProductList" id="orderProductList">
        ${productListString}
        </ul>
        <span class="orderAmount" id="orderAmount">Total Amount:${order.totalAmount}</span>
        `

        mainBody.appendChild(orderDisplay);
    }
}


document.addEventListener('DOMContentLoaded',async (e)=>{
    try{
        const orderDetails = await axios.get('http://localhost:3000/product/order');
        createOrderList(orderDetails.data);
    }
    catch(e){
        console.log(e);
    }
})