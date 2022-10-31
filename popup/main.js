const open = document.querySelector('#open');
const container = document.querySelector('#container');
const close = document.querySelector('#close'); 

open.addEventListener('click',()=>{
    container.classList.add('active');    
})

close.addEventListener('click',()=>{
    container.classList.remove('active');
})



