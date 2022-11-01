const imageContainer = document.querySelector('#image-container');
const images = imageContainer.getElementsByTagName('img');

function translate(){
    let index=0;
    let length = images.length;
    return function(){
        setInterval(()=>{
            index=index % length;
            imageContainer.style.transform = `translateX(${-index*500}px)`;
            index++;
        },1000);
    }   
}
translate()();