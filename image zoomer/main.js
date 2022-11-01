const container = document.querySelector('#container');
const img = container.querySelector('img');


img.addEventListener('mousemove',(e)=>{
    const x = e.clientX-e.target.offsetLeft;
    const y = e.clientY-e.target.offsetTop;

    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = `scale(2)`;
})

img.addEventListener('mouseleave',(e)=>{
    img.style.transformOrigin = `center center`;
    img.style.transform = `scale(1)`;
})