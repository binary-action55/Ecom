const button = document.querySelector('#btn');
const container = document.querySelector('#container');
button.addEventListener('click',()=>{
    const toast = document.createElement('div');
    toast.setAttribute('class','toast');
    toast.innerText = "Toast Message";

    container.appendChild(toast);


    setTimeout(()=>toast.remove(),3000);

})