const mainBody = document.querySelector('.mainContent');


function createOrderList(orderDetails){
    for(let order of orderDetails)
    {
        const orderDisplay = document.createElement('article');
        orderDisplay.classList.add('orderDisplay');
        
        orderDisplay.innerHTML = `
        <span class="orderId" id="orderId">Order Id:${order.id}</span>
        <span class="orderDate" id="">${order.date}</span>
        <ul class="orderProductList" id="orderProductList">
        `;

        for(let product of order.products){
            orderDisplay.innerHTML+=`<li>Product Name: ${product.name} Qty: ${product.quantity}`
        }

        orderDisplay.innerHTML+=`<span class="orderAmount" id="orderAmount">Amount:${order.totalAmount}</span>`;

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