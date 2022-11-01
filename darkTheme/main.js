const check = document.querySelector('#theme');
const body = document.querySelector('body');

check.addEventListener('change',(e)=>{
    body.classList.toggle('dark',e.target.checked);
})

